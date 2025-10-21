interface Competition
{
    name: string;
    events: Event[];
    schedule: Schedule;
}

interface Event
{
    eventID: string;
    rounds: Round[];
}

interface Round
{
    roundID: string;
    format: string;
    timeLimit: TimeLimit;
    cutoff: number;
    advancementCondition: AdvancementCondition;
    scrambleSetCount: number;
}

interface TimeLimit
{
    centiseconds: number;
    cumulativeRoundIDs: string[];
}

interface AdvancementCondition
{
    type: string;
    level: number;
}

interface Schedule
{
    startDate: string;
    numberOfDays: number;
    venues: Venue[];
}

interface Venue
{
    venueID: number;
    venueName: string;
    rooms: Room[];
}

interface Room
{
    roomID: number;
    roomName: string;
    activities: Activity[];
}

interface Activity
{
    activityID: number;
    activityName: string;
    activityCode: string;
    startTime: Date;
    endTime: Date;
    childActivities: Activity[];
}

interface EventDetail
{
    eventCode: string;
    eventName: string;
    eventVenue: string;
    eventRoom: string;
    eventRound: number;
    eventAttempt: number;
    eventGroupDetails: EventGroupDetail[];
    eventStartTime: Date;
}

interface EventGroupDetail
{
    eventGroup: string;
    eventGroupNumber: number;
    eventStartTime: Date;
}

export type {
    Competition,
    Event,
    Round,
    TimeLimit,
    AdvancementCondition,
    Schedule,
    Venue,
    Room,
    Activity,
    EventDetail,
    EventGroupDetail
};