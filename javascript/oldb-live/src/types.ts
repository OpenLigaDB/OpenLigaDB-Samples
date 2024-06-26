export interface OldbData {
    matchID: number;
    matchDateTime: string;
    timeZoneID: string;
    leagueId: number;
    leagueName: string;
    leagueSeason: number;
    leagueShortcut: string;
    matchDateTimeUTC: string;
    group: OldbGroup;
    team1: OldbTeam;
    team2: OldbTeam;
    lastUpdateDateTime: string;
    matchIsFinished: boolean;
    matchResults: OldbMatchResult[];
    goals: OldbGoal[];
    location?: any;
    numberOfViewers?: any;
}

export interface OldbGoal {
    goalID: number;
    scoreTeam1: number;
    scoreTeam2: number;
    matchMinute: number;
    goalGetterID: number;
    goalGetterName: string;
    isPenalty: boolean;
    isOwnGoal: boolean;
    isOvertime: boolean;
    comment?: string;
}

export interface OldbMatchResult {
    resultID: number;
    resultName: string;
    pointsTeam1: number;
    pointsTeam2: number;
    resultOrderID: number;
    resultTypeID: number;
    resultDescription?: string;
}

export interface OldbTeam {
    teamId: number;
    teamName: string;
    shortName: string;
    teamIconUrl: string;
    teamGroupName?: any;
}

export interface OldbGroup {
    groupName: string;
    groupOrderID: number;
    groupID: number;
}