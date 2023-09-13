import { z } from 'zod';

export const assignEmployeesValidationSchema = z.object({
  eventId: z.string().nonempty({ message: 'Event is required' }),
  assignedEmployees: z.array(
    z.object({
      employeeId: z.string().nonempty({ message: 'Employee is required' }),
      position: z.string().nonempty({ message: 'Position is required' }),
      payment: z.number().min(1, { message: 'Payment must be greater than 0' }),
    })
  ),
});
