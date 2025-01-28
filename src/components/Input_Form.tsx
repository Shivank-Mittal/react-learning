import { FormEvent } from "react";

function Input_Form({onSubmitAction, buttonName = "add"}: {onSubmitAction:(data:string) => void, buttonName?: string} ) {

    const handelForm = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.elements.namedItem("todo")
        onSubmitAction((form.elements.namedItem("todo") as HTMLInputElement).value)
    }
    return (
        <form className="flex" onSubmit={handelForm}>
            <input
                type = "text"
                name = "todo"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                {buttonName}
            </button>
        </form>
    );
}

export default Input_Form;