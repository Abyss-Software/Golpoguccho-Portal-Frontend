import { employeeApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function useEmployeeAction() {
  const createEmployeeMutation = useMutation({
    mutationFn: employeeApi.createEmployee,
    onMutate: () => {
      notifications.show({
        id: 'createEmployee',
        loading: true,
        title: 'Creating Employee...',
        message: 'Please wait while we are creating employee',
        autoClose: false,
        withCloseButton: false,
      });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: employeeApi.updateEmployee,
    onMutate: () => {
      notifications.show({
        id: 'updateEmployee',
        loading: true,
        title: 'Updating Employee...',
        message: 'Please wait while we are updating employee',
        autoClose: false,
        withCloseButton: false,
      });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onMutate: () => {
      notifications.show({
        id: 'deleteEmployee',
        loading: true,
        title: 'Deleting Employee...',
        message: 'Please wait while we are deleting employee',
        autoClose: false,
        withCloseButton: false,
      });
    },
  });

  const fetchEmployees = () =>
    useQuery({
      queryKey: ['employees'],
      queryFn: employeeApi.getEmployees,
    });

  const fetchEmployee = (id: string) =>
    useQuery({
      enabled: !!id,
      queryKey: ['employee', id],
      queryFn: async () => await employeeApi.getEmployee(id),
    });

  return {
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
    fetchEmployees,
    fetchEmployee,
  };
}
