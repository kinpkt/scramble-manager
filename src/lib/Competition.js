const WCACompetition = {
  CompetitionName: "Sample Competition",
  Events: [
    {
      EventID: "333",
      Rounds: [
        {
          RoundID: "1",
          Format: "a",
          TimeLimit: { CentiSeconds: 6000, CumulativeRoundIDs: [] },
          Cutoff: 20,
          AdvancementCondition: { Type: "percent", Level: 1 },
          ScrambleSetCount: 1
        }
      ]
    }
  ],
  Schedule: {
    StartDate: "2025-12-01",
    NumberOfDays: 3,
    Venues: [
      {
        VenueID: 1,
        VenueName: "Main Hall",
        Rooms: [
          {
            RoomID: 101,
            RoomName: "Room A",
            Activities: [
              {
                ActivityID: 1,
                ActivityName: "333 1st Round",
                ActivityCode: "333R1",
                StartTime: "2025-12-01T09:00:00Z",
                EndTime: "2025-12-01T11:00:00Z",
                ChildActivities: []
              }
            ]
          }
        ]
      }
    ]
  }
};
