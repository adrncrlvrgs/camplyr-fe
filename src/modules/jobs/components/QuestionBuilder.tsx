import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Modifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  MAX_QUESTIONS,
  QUESTION_TYPE_LABELS,
  isChoiceQuestion,
  type QuestionType,
} from "@/utils/constant/jobType";


export interface JobQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options: string[];
}

const makeQuestion = (patch: Partial<JobQuestion> = {}): JobQuestion => ({
  id: crypto.randomUUID(),
  label: "",
  type: "SHORT_TEXT",
  required: true,
  options: [],
  ...patch,
});

// One-tap starters so an empty builder is an invitation, not a blank wall.
const SUGGESTIONS: Array<Partial<JobQuestion>> = [
  { label: "How many years of relevant experience do you have?", type: "SHORT_TEXT", required: true },
  { label: "Are you able to start within 30 days?", type: "YES_NO", required: true },
  { label: "What is your expected salary?", type: "NUMBER", required: false },
  { label: "Why do you want this role?", type: "LONG_TEXT", required: false },
];

// Keep the dragged card inside its column: vertical movement only.
const lockToYAxis: Modifier = ({ transform }) => ({ ...transform, x: 0 });

/* ---------- one sortable question card ---------- */

interface CardProps {
  q: JobQuestion;
  index: number;
  draft: string;
  onDraftChange: (v: string) => void;
  onUpdate: (patch: Partial<JobQuestion>) => void;
  onRemove: () => void;
  onAddOption: () => void;
}

function SortableQuestion({
  q,
  index,
  draft,
  onDraftChange,
  onUpdate,
  onRemove,
  onAddOption,
}: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: q.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-background p-3 ${
        isDragging
          ? "relative z-10 shadow-lg ring-2 ring-primary/40"
          : "shadow-sm"
      }`}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle + position */}
        <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
          <button
            type="button"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            aria-label={`Drag to reorder question ${index + 1}`}
            className="cursor-grab touch-none rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary"
            aria-hidden
          >
            {index + 1}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={q.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              placeholder="Type your question"
              aria-label={`Question ${index + 1}`}
              className="flex-1"
            />
            <select
              value={q.type}
              aria-label={`Answer type for question ${index + 1}`}
              onChange={(e) => {
                const type = e.target.value as QuestionType;
                onUpdate({ type, options: isChoiceQuestion(type) ? q.options : [] });
              }}
              className="h-10 rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-40"
            >
              {Object.entries(QUESTION_TYPE_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {isChoiceQuestion(q.type) && (
            <div className="space-y-2 rounded-md bg-muted/50 p-3">
              {q.options.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {q.options.map((opt) => (
                    <span
                      key={opt}
                      className="inline-flex items-center gap-1 rounded-full border bg-background py-0.5 pl-2.5 pr-1 text-xs"
                    >
                      {opt}
                      <button
                        type="button"
                        aria-label={`Remove option ${opt}`}
                        onClick={() =>
                          onUpdate({ options: q.options.filter((o) => o !== opt) })
                        }
                        className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={draft}
                  placeholder="Add an option, then press Enter"
                  aria-label="New option"
                  onChange={(e) => onDraftChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // don't submit the whole form
                      onAddOption();
                    }
                  }}
                />
                <Button type="button" size="sm" variant="outline" onClick={onAddOption}>
                  Add
                </Button>
              </div>
              {q.options.length < 2 && (
                <p className="text-xs text-amber-600">Add at least 2 options.</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              role="switch"
              aria-checked={q.required}
              onClick={() => onUpdate({ required: !q.required })}
              className="group flex items-center gap-2 text-xs text-muted-foreground focus-visible:outline-none"
            >
              <span
                className={`relative h-5 w-9 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-primary/40 ${
                  q.required ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    q.required ? "translate-x-4" : ""
                  }`}
                />
              </span>
              Required
            </button>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={onRemove}
              aria-label={`Delete question ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ---------- builder ---------- */

interface Props {
  value: JobQuestion[];
  onChange: (q: JobQuestion[]) => void;
}

export function QuestionBuilder({ value, onChange }: Props) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const atLimit = value.length >= MAX_QUESTIONS;

  const sensors = useSensors(
    // A small distance lets clicks on the handle through without starting a drag.
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    // Space to pick up, arrow keys to move, Space to drop.
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const update = (id: string, patch: Partial<JobQuestion>) =>
    onChange(value.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  const remove = (id: string) => onChange(value.filter((q) => q.id !== id));

  const addOption = (q: JobQuestion) => {
    const draft = (drafts[q.id] ?? "").trim();
    if (!draft || q.options.includes(draft)) return;
    update(q.id, { options: [...q.options, draft] });
    setDrafts((d) => ({ ...d, [q.id]: "" }));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = value.findIndex((q) => q.id === active.id);
    const to = value.findIndex((q) => q.id === over.id);
    if (from < 0 || to < 0) return;
    onChange(arrayMove(value, from, to));
  };

  return (
    <div className="space-y-3">
      {value.length === 0 ? (
        <div className="rounded-lg border border-dashed p-4">
          <p className="text-sm text-muted-foreground">
            Screen applicants before you read a single CV. Start from a common
            question or write your own.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => onChange([...value, makeQuestion(s)])}
                className="rounded-full border bg-background px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[lockToYAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-3">
              {value.map((q, i) => (
                <SortableQuestion
                  key={q.id}
                  q={q}
                  index={i}
                  draft={drafts[q.id] ?? ""}
                  onDraftChange={(v) => setDrafts((d) => ({ ...d, [q.id]: v }))}
                  onUpdate={(patch) => update(q.id, patch)}
                  onRemove={() => remove(q.id)}
                  onAddOption={() => addOption(q)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={atLimit}
          onClick={() => onChange([...value, makeQuestion()])}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add question
        </Button>
        <span className="text-xs text-muted-foreground">
          {value.length > 1 && "Drag the handle to reorder · "}
          {value.length} of {MAX_QUESTIONS}
        </span>
      </div>
    </div>
  );
}