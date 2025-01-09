import { PrismaPagination } from '@gastromatic/graphql-cursor-pagination-prisma'

import { Post, Prisma } from '@prisma/client'
import { PostFilterField, PostOrderField } from './generated/graphql'
import {
  FilterOperation,
  OrderDirection,
} from '@gastromatic/graphql-cursor-pagination-core'

export const postPagination = new PrismaPagination<
  Post,
  Prisma.PostWhereInput,
  Prisma.PostOrderByWithRelationInput,
  PostOrderField,
  PostFilterField
>(
  {
    [PostOrderField.AUTHOR_NAME]: {
      orderBy: {
        author: {
          name: 'asc',
        },
      },
      nullable: false,
      // TODO
      getCursor: (e) => '',
    },
    [PostOrderField.TITLE]: {
      getCursor: (e) => e.title,
      orderBy: {
        title: 'asc',
      },
      nullable: false,
      defaultOrder: OrderDirection.DESC,
    },
    id: {
      getCursor: (e) => e.id.toString(),
      parseCursor: (cursor) => parseInt(cursor),
      orderBy: { id: 'asc' },
      unique: true,
      default: true,
      nullable: false,
      defaultOrder: OrderDirection.DESC,
    },
  },
  {
    [PostFilterField.AUTHOR_EMAIL]: {
      getFilter: (operation, value) => {
        if (operation !== FilterOperation.EQ) {
          throw new Error('Invalid operation')
        }
        if (!value) {
          throw new Error('Invalid value')
        }
        return {
          author: {
            email: value,
          },
        }
      },
    },
    [PostFilterField.VIEW_COUNT]: {
      getFilter: (operation, value) => {
        if (!value) {
          throw new Error('Invalid value')
        }
        const parsedValue = parseInt(value)
        if (operation === FilterOperation.EQ) {
          return {
            viewCount: parseInt(value),
          }
        }

        if (operation === FilterOperation.GT) {
          return {
            viewCount: {
              gt: parsedValue,
            },
          }
        }

        throw new Error('Invalid operation')
      },
    },
  },
)
