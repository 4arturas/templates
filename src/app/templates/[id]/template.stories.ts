import type { Meta, StoryObj } from '@storybook/react';
import {TemplateComponent} from "./template.component";
import {categorySelectArr, categorySelectItemArr, templatesResponse} from "./template.mock";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/templates/template',
  component: TemplateComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    categorySelectArr: categorySelectArr,
    categorySelectItemArr: categorySelectItemArr,
    templateResponse: [],
    templateFunctionCreateNew: (name: string, subject: string, to: string, icon: string, templateText: string, categoryValueIdArr: Array<{categoryId: string, valueId: string}>) => { alert( 'Not implemented' ) }
  },
} satisfies Meta<typeof TemplateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    templateResponse: templatesResponse,
    categorySelectArr: categorySelectArr,
    categorySelectItemArr: categorySelectItemArr,
  },
};