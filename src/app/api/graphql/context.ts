import { PrismaDataService } from '@/app/server/data/prisma-data-service';
import { User } from 'better-auth';
import { NextRequest } from 'next/server';

export type GraphQLContext = {
  req?: NextRequest;
  dataService: PrismaDataService;
  user?: User;
};
