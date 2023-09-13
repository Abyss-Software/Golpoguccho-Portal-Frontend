import { assignEmployeesValidationSchema } from '@/constants/validation/AssignEmployeeValidationSchema';
import useEmployeeAction from '@/hooks/useEmployeeActions';
import useEventAction from '@/hooks/useEventAction';
import { IAssignEmployeesDto } from '@/interfaces/assignEmployees.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

export default function EmployeeAssignForm({ eventId }: { eventId: string }) {
  const { fetchEventById, assignEmployeesMutation } = useEventAction();
  const { fetchEmployees } = useEmployeeAction();

  const { data: event, isLoading: isEventDataLoading } = fetchEventById(
    eventId!
  );
  const { data: employees } = fetchEmployees();

  const [employeeOptions, setEmployeeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (employees) {
      const options = employees.map((employee) => ({
        value: employee.id,
        label: employee.user.name,
      }));
      setEmployeeOptions(options);
    }
  }, [employees]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IAssignEmployeesDto>({
    resolver: zodResolver(assignEmployeesValidationSchema),
    defaultValues: {
      eventId: eventId,
      assignedEmployees: event?.assignedEmployees,
    },
  });

  console.log(event);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assignedEmployees',
  });

  const onSubmit = (data: any) => {
    assignEmployeesMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'assignEmployees',
          color: 'green',
          title: 'Success',
          message: 'Employees Assigned',
          icon: <CheckIcon size="2rem" />,
        });
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'assignEmployees',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Assign Employees </h1>
        {isEventDataLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="pt-5 pb-5">
            {fields.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className="flex gap-2 items-center justify-center pb-4"
                >
                  <Select
                    {...register(`assignedEmployees.${index}.employeeId`)}
                    size="md"
                    placeholder="Pick employee"
                    searchable
                    nothingFound="No options"
                    data={employeeOptions}
                    defaultValue={event?.assignedEmployees[index]?.employeeId}
                    onChange={(value) => {
                      setValue(
                        `assignedEmployees.${index}.employeeId`,
                        value ?? ''
                      );
                    }}
                    error={
                      errors?.assignedEmployees?.[index]?.employeeId &&
                      errors?.assignedEmployees?.[index]?.employeeId?.message
                    }
                  />
                  <TextInput
                    {...register(`assignedEmployees.${index}.position`)}
                    size="md"
                    placeholder="Position"
                    defaultValue={event?.assignedEmployees[index]?.position}
                    error={
                      errors?.assignedEmployees?.[index]?.position &&
                      errors?.assignedEmployees?.[index]?.position?.message
                    }
                  />
                  <NumberInput
                    {...register(`assignedEmployees.${index}.payment`, {
                      valueAsNumber: true,
                    })}
                    size="md"
                    min={0}
                    max={100000}
                    placeholder="Payment"
                    defaultValue={event?.assignedEmployees[index]?.payment}
                    onChange={(value) => {
                      setValue(
                        `assignedEmployees.${index}.payment`,
                        value || 0
                      );
                    }}
                    error={
                      errors?.assignedEmployees?.[index]?.payment &&
                      errors?.assignedEmployees?.[index]?.payment?.message
                    }
                  />

                  <Button
                    type="button"
                    color="red"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </li>
              );
            })}
          </ul>
        )}

        <section>
          <Button
            type="button"
            onClick={() => {
              append({ employeeId: '', position: '', payment: 0 });
            }}
          >
            Add Employee
          </Button>
        </section>

        <Button type="submit" className="mt-5 mb-5">
          Assign
        </Button>
      </form>
    </div>
  );
}
