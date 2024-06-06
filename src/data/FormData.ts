import { FormDataSection } from '../components/Form/types';

export const data: FormDataSection[] = [
  {
    id: 1,
    text: 'Checkbox',
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
          {
            label: 'Story Points Metrics',
            value: 'storyPointsMetrics',
            condition: {
              text: 'Please provide additional details',
              type: 'dropdown',
              options: [
                { label: 'Story Points Per Assignee', value: 'storyPointsPerAssignee' },
                { label: 'Story Points Per Team', value: 'storyPointsPerTeam' },
                { label: 'Story Points Per Sprint', value: 'storyPointsPerSprint' },
              ],
            },
          },
          { label: 'Story Points by Product Area', value: 'storyPointsProductArea' },
          { label: 'Story Points by Component Family', value: 'storyPointsComponentFamily' },
          { label: 'Contribution by Badge Type', value: 'ContributionByBadgeType' },

          {
            label: 'Test 1',
            value: 'Test 1',
            condition: {
              text: 'Please provide additional details',
              type: 'dropdown',
              options: [
                {
                  label: 'Test 1_2',
                  value: 'Test 1_2',
                },
                {
                  label: 'Test 1_3',
                  value: 'Test 1_3',
                },
                {
                  label: 'Test 1_4',
                  value: 'Test 1_4',
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
