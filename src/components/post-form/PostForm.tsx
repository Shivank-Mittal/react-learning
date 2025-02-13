import { useCallback, useEffect } from 'react'
import { Button, Input, RTE, Select} from '../index'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useUserData } from '../../store/selector/auth.selector'
import bucket from '../../data/appWrite/bucket'
import database from '../../data/appWrite/database'
import { BLOG_FULL_ROUTE } from '../../constants/router'



export default function PostForm({post}) {

  const navigate =  useNavigate();
  const userData = useUserData()
  const {register, control, watch, getValues, handleSubmit, setValue} =  useForm({
      defaultValues: {
          title: post?.title || "",
          slug: post?.slug || '',
          content:  post?.content || "",
          status: post?.status || 'active',
          image: post?.image || ""
      },
      mode: 'onChange'
  })

  

  const submit = async (data) => {
    if(post) {
      await editPost(data);
    }else {
      await createPost(data)
    }
  }

  const editPost = async (data) => {
    const image = data.image[0];
    const fileUploadPromise = image ? bucket.uploadFile(image) : Promise.resolve(null)
    const fileUploaded =  await fileUploadPromise;

    if(fileUploaded) {
      bucket.delete(post.featuredImage)
    }

    const dbPost = await database.updatePost(
      {
        slug: post.$id , 
        userId: post.userId,
        postInfo: {...data, featuredImage: fileUploaded ? fileUploaded?.$id : post.featuredImage }
      })

    if (dbPost) {
      const postVal = await database.getPost(post.$id);
      navigate(`${BLOG_FULL_ROUTE.BASE}post/${postVal.$id}`);
    }
  } 

  const createPost = async(data) => {
    const file = await bucket.uploadFile(data.image[0]);

    if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        database.createPost({ ...data, userId: userData?.$id })
        .then((dbPost) =>  navigate(`${BLOG_FULL_ROUTE.BASE}post/${dbPost.$id}`))
        .catch((error) => console.log('Error accord while creating the post: ',error))
    }
  }

  const slugTransform = useCallback( (value:string) => {
    if (value && typeof value === "string")
      return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

      return "";
  }, []) 

  useEffect(() => {
    const currentTitle = watch('title');
    if (currentTitle) {
      setValue("slug", slugTransform(currentTitle), { shouldValidate: true });
    }
    
    const subscription = watch((value, {name}) => {
      if ((name === "title") && value.title) {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap max-w-6xl">
      <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            labelClassName='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            type='text'
            props={register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            labelClassName='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            type='text'
            props={register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            labelClassName='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            accept="image/png, image/jpg, image/jpeg, image/gif"
            props={register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={bucket.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status: "
            className="mb-4"
            labelClassName='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            props = {register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}
