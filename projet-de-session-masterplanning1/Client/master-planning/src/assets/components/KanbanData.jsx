import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    _id: '1',
    titre: 'Première tâche',
    // Assigned_To: 'Beltran',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: '25-May-2020',
  },
  {
    _id: '2',
    titre: 'Deuxième tâche',
    // Assigned_To: 'Dave',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: '26-May-2020',
  },
  {
    _id: '3',
    titre: 'Handle Door Specs',
    // Assigned_To: 'Roman',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: '27-May-2020',
  },
  {
    _id: '4',
    titre: 'morbi',
    // Assigned_To: 'Gawen',
    // Assignee: 'Kai',
    // Status: 'Done',
    // Priority: 'High',
    Due_Date: '23-Aug-2020',
  },
  {
    _id: '5',
    titre: 'proin',
    // Assigned_To: 'Bondon',
    // Assignee: 'Antoinette',
    // Status: 'In Progress',
    // Priority: 'Medium',
    Due_Date: '05-Jan-2021',
  },
];
export const data1={

}
export const data2={

}
export const columnsFromBackend = {
  [uuidv4()]: {
    titreListe: 'To-do',
    items: data,
  },
  [uuidv4()]: {
    titreListe: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    titreListe: 'Done',
    items: [],
  },
};
