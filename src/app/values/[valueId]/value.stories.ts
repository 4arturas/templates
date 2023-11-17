import type { Meta, StoryObj } from '@storybook/react';
import {ValueComponent} from "./value.component";
import {Value} from "@prisma/client";

const value:Value = {id: '1', name: 'LT', createdAt: new Date(), updatedAt: new Date(), deletedAt: null }

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/values/value',
  component: ValueComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {id: '1', name: 'LT'}

  },
} satisfies Meta<typeof ValueComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const View: Story = {
  args: {
    value: value
  },
};