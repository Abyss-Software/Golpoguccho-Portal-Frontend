import {
  Button,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICreateEmployee } from '@/interfaces/employees.interface';
import { EmployeeCreateValidationSchema } from '@/constants/validation/EmployeeProfileValidationSchema';
import { positionOptions, roleOptions } from '@/constants/selectOptions';

function EmployeeCreationForm({
  onEmployeeCreate,
}: {
  onEmployeeCreate: SubmitHandler<ICreateEmployee>;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ICreateEmployee>({
    resolver: zodResolver(EmployeeCreateValidationSchema),
  });

  const onSubmitClick = () => {
    onEmployeeCreate(getValues());
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitClick)}>
      <TextInput
        {...register('name')}
        size="md"
        label="Name"
        placeholder="Enter Employee Name"
        error={errors?.name?.message}
      />

      <TextInput
        {...register('email')}
        size="md"
        label="Email"
        placeholder="Enter Employee Email"
        error={errors?.email?.message}
      />

      <PasswordInput
        {...register('password')}
        size="md"
        label="Password"
        placeholder="Enter Employee Password"
        error={errors?.password?.message}
      />

      <TextInput
        {...register('contactPrimary')}
        size="md"
        label="Primary Contact"
        placeholder="Enter Employee Primary Contact"
        error={errors?.contactPrimary?.message}
      />

      <TextInput
        {...register('contactSecondary')}
        size="md"
        label="Secondary Contact"
        placeholder="Enter Employee Secondary Contact"
        error={errors?.contactSecondary?.message}
      />

      <Textarea
        {...register('address')}
        size="md"
        label="Address"
        placeholder="Enter Employee Address"
        error={errors?.address?.message}
      />
      <Select
        {...register(`position`)}
        label="Position"
        size="md"
        placeholder="Enter Employee Position"
        searchable
        nothingFound="No options"
        data={positionOptions}
        onChange={(value) => {
          setValue(`position`, value ?? '');
        }}
        error={errors?.position?.message}
      />

      <Select
        {...register(`role`)}
        label="Role"
        size="md"
        placeholder="Enter Employee Role"
        searchable
        nothingFound="No options"
        data={roleOptions}
        onChange={(value) => {
          setValue(`role`, value ?? '');
        }}
        error={errors?.role?.message}
      />

      <TextInput
        {...register('verificationType')}
        size="md"
        label="Verification Type"
        placeholder="Enter Employee Verification Type"
        error={errors?.verificationType?.message}
      />

      <TextInput
        {...register('verificationId')}
        size="md"
        label="Verification ID"
        placeholder="Enter Employee Verification ID"
        error={errors?.verificationId?.message}
      />

      <NumberInput
        {...register('baseSalary', { valueAsNumber: true })}
        size="md"
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        label="Base Salary"
        placeholder="Enter Employee Base Salary"
        error={errors?.baseSalary?.message}
        onChange={(value) => setValue('baseSalary', value || 0)}
      />

      <NumberInput
        {...register('monthlySalary', { valueAsNumber: true })}
        size="md"
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        label="Monthly Salary"
        placeholder="Enter Employee Monthly Salary"
        error={errors?.monthlySalary?.message}
        onChange={(value) => setValue('monthlySalary', value || 0)}
      />

      <Button type="submit">Create Employee</Button>
    </form>
  );
}

export default EmployeeCreationForm;
