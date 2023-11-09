import { z } from 'zod';

export const assignEmployeesValidationSchema = z.object({
  eventId: z.string().min(1, { message: 'Event is required' }),
  assignedEmployees: z.array(
    z.object({
      employeeId: z.string().min(1, { message: 'Employee is required' }),
      position: z.string().min(1, { message: 'Position is required' }),
      payment: z.number().min(1, { message: 'Payment must be greater than 0' }),
    })
  ),
});
