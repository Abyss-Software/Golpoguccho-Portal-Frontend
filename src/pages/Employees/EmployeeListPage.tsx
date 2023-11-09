import CommonDataTable from '@/components/dataTable/CommonDataTable';
import {
  ICreateEmployee,
  IUpdateEmployee,
} from '@/interfaces/employees.interface';
import { useNavigate } from 'react-router-dom';
import { Text, Button, Card } from '@mantine/core';
import { IEmployee } from '@/interfaces/employees.interface';
import useEmployeeAction from '@/hooks/useEmployeeActions';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { modals } from '@mantine/modals';
import EmployeeCreationForm from '@/components/employee/EmployeeCreationForm';
import EmployeeUpdateForm from '@/components/employee/EmployeeUpdateForm';
import { employeeColumns } from '@/components/employee/employeeColumns';
import { useAuthStore } from '@/contexts/authContext';

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const handleRowClick = (row: IEmployee) => {
    navigate(`/admin/employees/${row.user.id}`);
  };

  const { userInfo } = useAuthStore();

  const {
    fetchEmployees,
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
  } = useEmployeeAction();

  const { data: employees = [] } = fetchEmployees();

  const onEmployeeCreate = (data: ICreateEmployee) => {
    createEmployeeMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'createEmployee',
          color: 'green',
          title: 'Success',
          message: 'Employee Created',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'createEmployee',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onEmployeeUpdate = (data: IUpdateEmployee) => {
    updateEmployeeMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'updateEmployee',
          color: 'green',
          title: 'Success',
          message: 'Employee Updated',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'updateEmployee',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onEmployeeDelete = (id: string) => {
    deleteEmployeeMutation.mutate(id, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'deleteEmployee',
          color: 'green',
          title: 'Success',
          message: 'Employee Deleted',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'deleteEmployee',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const handleCreateEmployee = () => {
    modals.open({
      title: 'Create Employee',
      centered: true,
      size: 'lg',
      children: <EmployeeCreationForm onEmployeeCreate={onEmployeeCreate} />,
    });
  };

  const handleUpdateEmployee = (row: IUpdateEmployee) => {
    modals.open({
      title: 'Update Employee',
      centered: true,
      size: 'lg',
      children: (
        <EmployeeUpdateForm
          onEmployeeUpdate={onEmployeeUpdate}
          defaultValues={row}
        />
      ),
    });
  };

  const handleDeleteEmployee = (row: IEmployee) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this Employee?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => onEmployeeDelete(row.id),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl ">List of Employees</h1>
        {userInfo?.role === 'ADMIN' && (
          <Button
            variant="filled"
            color="primary"
            size="md"
            onClick={handleCreateEmployee}
          >
            Add Employee
          </Button>
        )}
      </div>
      <Card withBorder shadow="lg">
        <CommonDataTable<IEmployee>
          data={employees}
          columns={employeeColumns({
            onEmployeeUpdate: handleUpdateEmployee,
            onEmployeeDelete: handleDeleteEmployee,
          })}
          handleRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
};

export default EmployeeListPage;
