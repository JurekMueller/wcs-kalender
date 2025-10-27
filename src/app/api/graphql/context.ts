import { PrismaDataService } from '@/app/server/data/prisma-data-service';
import { NextRequest } from 'next/server';

export type GraphQLContext = {
  req: NextRequest;
  dataService: PrismaDataService;
};
