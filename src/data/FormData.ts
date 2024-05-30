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
];
