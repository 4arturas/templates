import type { Meta, StoryObj } from '@storybook/react';
import {CategoriesComponent} from "./categories.component";
// import {CategoryComponent} from "@/app/components/categories/categories.component";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/categories/categories',
  component: CategoriesComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    categories: []
  },
} satisfies Meta<typeof CategoriesComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    categories: [
      {id: '1', name: 'Country', createdAt: new Date(), updatedAt: new Date() },
      {id: '2', name: 'Department', createdAt: new Date(), updatedAt: new Date() },
      {id: '3', name: 'Product', createdAt: new Date(), updatedAt: new Date() },
      {id: '4', name: 'Customer Type', createdAt: new Date(), updatedAt: new Date() },
      {id: '5', name: 'Case Type', createdAt: new Date(), updatedAt: new Date() },
      {id: '6', name: 'Customer Type', createdAt: new Date(), updatedAt: new Date() },
      {id: '7', name: 'SU', createdAt: new Date(), updatedAt: new Date() },
    ]
  },
};

export const Secondary: Story = {
  args: {
    categories: []
  },
};