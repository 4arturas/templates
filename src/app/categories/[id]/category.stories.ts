import type { Meta, StoryObj } from '@storybook/react';
import {CategoryComponent} from "./category.component";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/categories/category',
  component: CategoryComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    category: {id: '1', name: 'Country', createdAt: new Date(), updatedAt: new Date() },
    categoryData: [
      {id: '1', name: 'LT'},
      {id: '2', name: 'DK'},
    ]
  },
} satisfies Meta<typeof CategoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    category: {id: '1', name: 'Country', createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
    categoryData: [
      {id: '1', name: 'LT', createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      {id: '2', name: 'DK', createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
    ]
  },
};