import type { Meta, StoryObj } from '@storybook/react';
import {TemplatesComponent} from "./templates.component";
import {ITemplateResponse} from "@/app/utils";

const templates:Array<ITemplateResponse> = [{"id":"237187c5-d514-4346-b5cc-bfe3fbb22ba1","name":"Template 1","to":"To Template 1","subject":"Subject Template 1","icon":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"><path d=\"M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578\"></path></svg>","templateText":"<p>Template Text Template 1</p>","OneTemplateHasManyValues":[{"values":{"id":"18b8d5e7-2b5e-43cc-b945-652fb74b3212","name":"LT"},"category":{"id":"93eda1d4-8e08-4715-a2ac-8860af7f61b0","name":"Country"}},{"values":{"id":"4eadfebf-9018-4a36-8a0b-ca8bab9331a5","name":"LV"},"category":{"id":"93eda1d4-8e08-4715-a2ac-8860af7f61b0","name":"Country"}},{"values":{"id":"00c3e106-e658-475a-add7-dd405f6af8f9","name":"eBanking"},"category":{"id":"15ebec0f-f8bd-45ed-9525-7f6f3fdfc143","name":"Product"}}]},{"id":"c314fcc6-cd6d-4d96-9a3b-3be47369a118","name":"Template 2","to":"To Template 2","subject":"Subject Template 2","icon":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"><path d=\"M17.283,5.549h-5.26V4.335c0-0.222-0.183-0.404-0.404-0.404H8.381c-0.222,0-0.404,0.182-0.404,0.404v1.214h-5.26c-0.223,0-0.405,0.182-0.405,0.405v9.71c0,0.223,0.182,0.405,0.405,0.405h14.566c0.223,0,0.404-0.183,0.404-0.405v-9.71C17.688,5.731,17.506,5.549,17.283,5.549 M8.786,4.74h2.428v0.809H8.786V4.74z M16.879,15.26H3.122v-4.046h5.665v1.201c0,0.223,0.182,0.404,0.405,0.404h1.618c0.222,0,0.405-0.182,0.405-0.404v-1.201h5.665V15.26z M9.595,9.583h0.81v2.428h-0.81V9.583zM16.879,10.405h-5.665V9.19c0-0.222-0.183-0.405-0.405-0.405H9.191c-0.223,0-0.405,0.183-0.405,0.405v1.215H3.122V6.358h13.757V10.405z\"></path></svg>","templateText":"<p>Template Text Template 2</p>","OneTemplateHasManyValues":[{"values":{"id":"c1427f3a-a009-40d5-9a96-56cf32894594","name":"Business"},"category":{"id":"15ebec0f-f8bd-45ed-9525-7f6f3fdfc143","name":"Product"}}]}];

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
    templates: templates
  },
};