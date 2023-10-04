import { employeeApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useEmployeeAction() {
  const queryClient = useQueryClient();
  const createEmployeeMutation = useMutation({
    mutationFn: employeeApi.createEmployee,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'createEmployee',
        loading: true,
        title: 'Creating Employee...',
        message: 'Please wait while we are creating employee',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['employees']),
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: employeeApi.updateEmployee,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'updateEmployee',
        loading: true,
        title: 'Updating Employee...',
        message: 'Please wait while we are updating employee',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['employees']),
  });

  const updateProfileMutation = useMutation({
    mutationFn: employeeApi.updateProfile,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'updateProfile',
        loading: true,
        title: 'Updating Profile...',
        message: 'Please wait while we are updating your profile',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['employee']),
  });

  const salaryPaymentMutation = useMutation({
    mutationFn: employeeApi.makeSalaryPayment,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'salaryRecordCreation',
        loading: true,
        title: 'Adding Salary Record...',
        message: 'Please wait while we are adding salary record',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['employee', 'records']),
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'deleteEmployee',
        loading: true,
        title: 'Deleting Employee...',
        message: 'Please wait while we are deleting employee',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['employees']),
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
    updateProfileMutation,
    salaryPaymentMutation,
    deleteEmployeeMutation,
    fetchEmployees,
    fetchEmployee,
  };
}
