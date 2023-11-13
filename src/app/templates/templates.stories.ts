import type { Meta, StoryObj } from '@storybook/react';
import {ITemplateResponseNew} from "../utils";
import {TemplatesComponent} from "../templates/templates.component";

const templates:Array<ITemplateResponseNew> = [
  {
    "id": "86c84f79-8f67-441d-91a8-81b562ba8569",
    "name": "Template 1",
    "to": "To Template 1",
    "subject": "Subject Template 1",
    "icon": "favorite",
    "categories": [
      {
        "id": "597522b8-39c1-49ec-9623-b5a55a490bc9",
        "name": "Country",
        "values": [
          {
            "id": "0ed42e1b-e36f-4e84-89fd-3c38392cf896",
            "name": "NL"
          },
          {
            "id": "03b67350-bb3f-473f-95db-64eae3105b5c",
            "name": "LV"
          }
        ]
      },
      {
        "id": "661db3ae-5f98-4280-84f6-83ac1b02dc4e",
        "name": "Products",
        "values": [
          {
            "id": "13ac0d58-6a38-4403-ba17-830c159f7b04",
            "name": "eBanking"
          }
        ]
      }
    ]
  },
  {
    "id": "a7e3cdc6-9b06-4ae4-822b-5629e44aca26",
    "name": "Template 2",
    "to": "To Template 2",
    "subject": "Subject Template 2",
    "icon": "favorite_border",
    "categories": [
      {
        "id": "597522b8-39c1-49ec-9623-b5a55a490bc9",
        "name": "Country",
        "values": [
          {
            "id": "cf9fb3b6-d2be-43af-b2a0-f7b0eaf051c4",
            "name": "DE"
          },
          {
            "id": "8b4ac835-d778-478a-8c49-840736cedfc8",
            "name": "LT"
          }
        ]
      }
    ]
  },
  {
    "id": "c3abd9f7-f989-4e70-b8b8-d4c1b7168590",
    "name": "Template 3",
    "to": "To Template 3 Test",
    "subject": "Subject Template 3",
    "icon": "alarm_on",
    "categories": [
      {
        "id": "597522b8-39c1-49ec-9623-b5a55a490bc9",
        "name": "Country",
        "values": [
          {
            "id": "0ed42e1b-e36f-4e84-89fd-3c38392cf896",
            "name": "NL"
          },
          {
            "id": "03b67350-bb3f-473f-95db-64eae3105b5c",
            "name": "LV"
          }
        ]
      }
    ]
  }
];

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