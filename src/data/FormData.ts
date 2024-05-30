import {FormDataSection} from "../components/Form/types";

export const data: FormDataSection[] = [
    {
        id: 1,
        text: 'Heading 1',
        type: 'label',
        children: [
            {
                text: 'Checkbox',
                type: 'checkbox',
                errorMessage: 'Custom Message: Is required',
            },
            {
                text: 'Checkbox',
                type: 'checkbox',
            },
        ],
    },
    {
        id: 2,
        text: 'Input fields',
        type: 'label',
        children: [
            {
                text: 'Input field validate by string',
                type: 'text',
                validate: 'string',
            },
            {
                text: 'Input field validate by number',
                type: 'text',
                validate: 'number',
            },
            {
                text: 'Input field validate by email',
                type: 'text',
                validate: 'email',
            },
        ],
    },
    {
        id: 3,
        text: 'DropDown',
        type: 'label',
        children: [
            {
                text: 'What application',
                type: 'dropdown',
                options: [
                    { label: 'SalesMain', value: 'SalesMain' },
                    { label: 'CSOne', value: 'CSOne' },
                    { label: 'PXP', value: 'PXP' },
                    { label: 'Commerce', value: 'Commerce' },
                    { label: 'Others', value: 'Others' },
                ],
            },
        ],
    },
    {
        id: 4,
        text: 'Radio Button',
        type: 'label',
        children: [
            {
                text: 'Radio button with input field if Yes',
                type: 'radio',
                options: [
                    {
                        label: 'Yes',
                        value: 'Yes',
                        condition: { text: 'Please provide additional details', type: 'text' },
                    },
                    { label: 'No', value: 'No' },
                ],
            },
        ],
    },
];
