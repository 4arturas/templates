import type { Meta, StoryObj } from '@storybook/react';
import {TemplatesComponent} from "../templates/templates.component";
import {templates} from "./templates.mock";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/templates/templates',
  component: TemplatesComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    templates: []
  },
} satisfies Meta<typeof TemplatesComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    templates: templates,
    deleteTemplateAndRedirect: (id:string) => { alert( `Not implemented id=${id}`)}
  },
};