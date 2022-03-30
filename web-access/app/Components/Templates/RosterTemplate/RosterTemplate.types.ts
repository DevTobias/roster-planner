export type RosterEntry = {
  key: string;
  details: string;
  balanceOld: string;
  vacationOld: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  balanceNew: string;
  vacationNew: string;
};

export type RosterTemplateProps = {
  rosterData: RosterEntry[];
};
