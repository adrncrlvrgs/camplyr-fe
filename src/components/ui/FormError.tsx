type FormErrorsProps = {
    message?: string
}

export function FormError ({message} : FormErrorsProps){
    if(!message) return null;
    return <p className="text-sm text-red-500">{message}</p>
}