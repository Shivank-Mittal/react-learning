import {Editor } from '@tinymce/tinymce-react'
import {Controller, UseControllerProps} from 'react-hook-form'


interface IControlProps {
    title: any;
    slug: any;
    content: any;
    status: any;
    image: any
}

export default function RTE({name, control , defaultValue = "", label }: UseControllerProps<IControlProps> & {label: string} ) {
  return (
    <div>
        {label && <label>{label}</label>} 
        <Controller 
          name = {name || "content"}
          control={control}
          render={({field: {onChange}}) =>  (
            <Editor
              apiKey='dx4zik9dkhljvfij05dkkej7tf9xgliwlxwjxrckxginkm87'
              initialValue= {defaultValue}
              onEditorChange={onChange}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}
            >
            </Editor>
          )}
        />
    </div>
  )
}