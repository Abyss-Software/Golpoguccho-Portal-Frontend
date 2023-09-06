import {
  Button,
  CloseButton,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';

import { Dropzone } from '@mantine/dropzone';
import { PackageCreateValidatorSchema } from '@/constants/validation/PackageCreateValidatorSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type PackageCreate = {
  id?: string;
  title: string;
  description: string;
  image?: string;
  price: number;
};

function PackageCreateForm({
  onPackageUpdate,
  onPackageCreate,
  isUpdate,
  defaultValues,
}: {
  onPackageUpdate?: SubmitHandler<PackageCreate>;
  onPackageCreate?: SubmitHandler<PackageCreate>;
  isUpdate?: boolean;
  defaultValues?: PackageCreate;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PackageCreate>({
    resolver: zodResolver(PackageCreateValidatorSchema),
    defaultValues: defaultValues,
  });

  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const onFileDrop = (files: File[]) => {
    console.log(files[0]);
    toBase64(files[0]).then((res: string) => setValue('image', res));
  };

  const onSubmitClick = () => {
    if (isUpdate) {
      onPackageUpdate?.(getValues());
    } else {
      onPackageCreate?.(getValues());
    }
  };

  console.log(getValues(), errors);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitClick)}>
      {!watch('image') && (
        <Dropzone
          onDrop={onFileDrop}
          onReject={() => alert('Invalid file')}
          maxSize={3 * 1024 ** 2}
          accept={['image/png', 'image/jpeg', 'image/jpg']}
          maxFiles={1}
          className={errors?.image && 'border-red-500'}
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

      {watch('image') && (
        <div className="relative">
          <img
            src={watch('image')!}
            className="w-full h-64 object-cover"
            alt=""
          />

          <CloseButton
            color="red"
            className="absolute top-2 right-2"
            variant="filled"
            radius={'xl'}
            size={'lg'}
            onClick={() => setValue('image', undefined)}
          />
        </div>
      )}

      <TextInput
        {...register('title')}
        size="md"
        label="Title"
        placeholder="Enter Package Title"
        error={errors?.title && errors?.title?.message}
      />

      <NumberInput
        {...register('price')}
        size="md"
        min={0}
        max={100000}
        label="Price"
        placeholder="Enter Package Price"
        error={errors?.price && errors?.price?.message}
        onChange={(value) => setValue('price', value ? value : 0)}
      />

      <Textarea
        {...register('description')}
        size="md"
        label="Description"
        placeholder="Enter Package Description"
        error={errors?.description && errors?.description?.message}
      />

      <Button type="submit">Create Package</Button>
    </form>
  );
}

export default PackageCreateForm;
