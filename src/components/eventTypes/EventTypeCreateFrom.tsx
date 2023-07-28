import { Button, CloseButton, Text, TextInput, Textarea } from "@mantine/core";

import { Dropzone } from "@mantine/dropzone";
import { EventTypeCreateValidatorSchema } from "@/constants/validation/EventTypeCreateValidatorSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type EventTypeCreate = {
  title: string;
  description: string;
  image?: File;
};

function EventTypeCreateFrom() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventTypeCreate>({
    resolver: zodResolver(EventTypeCreateValidatorSchema),
  });

  const onFileDrop = (files: File[]) => {
    setValue("image", files[0]);
  };

  const onSubmit = (data: EventTypeCreate) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {!watch("image") && (
        <Dropzone
          onDrop={onFileDrop}
          onReject={() => alert("Invalid file")}
          maxSize={3 * 1024 ** 2}
          accept={["image/png", "image/jpeg", "image/jpg"]}
          maxFiles={1}
          className={errors?.image && "border-red-500"}
        >
          <div className="flex flex-col items-center justify-center">
            <Text size="lg" color="dimmed">
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed">
              Allowed formats: png, jpeg, jpg. Max file size: 3mb
            </Text>
          </div>
        </Dropzone>
      )}

      {watch("image") && (
        <div className="relative">
          <img
            src={URL.createObjectURL(watch("image")!)}
            className="w-full h-64 object-cover"
            alt=""
          />

          <CloseButton
            color="red"
            className="absolute top-2 right-2"
            variant="filled"
            radius={"xl"}
            size={"lg"}
            onClick={() => setValue("image", undefined)}
          />
        </div>
      )}

      <TextInput
        {...register("title", { required: true })}
        size="md"
        label="Title"
        placeholder="Enter Event Type Title"
        error={errors?.title && errors?.title?.message}
      />

      <Textarea
        {...register("description", { required: true })}
        size="md"
        label="Description"
        placeholder="Enter Event Type Description"
        error={errors?.description && errors?.description?.message}
      />

      <Button type="submit">Create Event Type</Button>
    </form>
  );
}

export default EventTypeCreateFrom;