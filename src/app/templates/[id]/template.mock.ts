import {ITemplateResponseNew} from "@/app/utils";

export const templatesResponse: ITemplateResponseNew = {
    "id": "c3abd9f7-f989-4e70-b8b8-d4c1b7168590",
    "name": "Template 3",
    "to": "To Template 3 Test",
    "subject": "Subject Template 3",
    "icon": "alarm_on",
    "templateText": "<p>Template Text Template 2</p>",
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
};

export const categorySelectArr = [
    {
        "name": "Country",
        "categoryId": "597522b8-39c1-49ec-9623-b5a55a490bc9",
        "selectedValue": [
            "NL",
            "LV"
        ],
        "selectedCategoryValueId": [
            "0ed42e1b-e36f-4e84-89fd-3c38392cf896",
            "03b67350-bb3f-473f-95db-64eae3105b5c"
        ]
    },
    {
        "name": "Products",
        "categoryId": "661db3ae-5f98-4280-84f6-83ac1b02dc4e",
        "selectedValue": [],
        "selectedCategoryValueId": []
    }
];

export const categorySelectItemArr = [
    {
        "name": "LV",
        "categoryValueId": "03b67350-bb3f-473f-95db-64eae3105b5c",
        "categoryId": "597522b8-39c1-49ec-9623-b5a55a490bc9"
    },
    {
        "name": "NL",
        "categoryValueId": "0ed42e1b-e36f-4e84-89fd-3c38392cf896",
        "categoryId": "597522b8-39c1-49ec-9623-b5a55a490bc9"
    },
    {
        "name": "LT",
        "categoryValueId": "10fe90d8-7944-4e59-a9fb-1a40dc8d2b1a",
        "categoryId": "597522b8-39c1-49ec-9623-b5a55a490bc9"
    },
    {
        "name": "USA",
        "categoryValueId": "41223ef9-09b7-47c9-bc4d-d072fadc1379",
        "categoryId": "597522b8-39c1-49ec-9623-b5a55a490bc9"
    },
    {
        "name": "eBanking",
        "categoryValueId": "13ac0d58-6a38-4403-ba17-830c159f7b04",
        "categoryId": "661db3ae-5f98-4280-84f6-83ac1b02dc4e"
    },
    {
        "name": "Business",
        "categoryValueId": "3a8a257b-558a-4e53-b73a-f237b51aa593",
        "categoryId": "661db3ae-5f98-4280-84f6-83ac1b02dc4e"
    }
]