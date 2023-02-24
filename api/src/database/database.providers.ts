import { ConfigService } from '@nestjs/config';
import dataSource from '../../db/data-source';
import entities from 'src/utils/typeorm';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];