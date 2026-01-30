import { useState, useMemo } from 'react';
import { sportsConfig, eventDates } from './WinningData.js';
import './Result.css';

const Result = () => {
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [selectedDate, setSelectedDate] = useState('2026-01-30');
  const [selectedStatus, setSelectedStatus] = useState('completed');

  // Get all matches from all team sports
  const allTeamMatches = useMemo(() => {
    const matches = [];
    sportsConfig
      .filter(sport => sport.type === 'team')
      .forEach(sport => {
        sport.data.forEach(match => {
          matches.push({
            ...match,
            sportId: sport.id,
            sportName: sport.name,
            sportIcon: sport.icon
          });
        });
      });
    return matches;
  }, []);

  // Get all individual sport events
  const allIndividualEvents = useMemo(() => {
    const events = [];
    sportsConfig
      .filter(sport => sport.type === 'individual')
      .forEach(sport => {
        sport.data.forEach(event => {
          events.push({
            ...event,
            sportId: sport.id,
            sportName: sport.name,
            sportIcon: sport.icon
          });
        });
      });
    return events;
  }, []);

  // Filter team matches
  const filteredTeamMatches = useMemo(() => {
    return allTeamMatches.filter(match => {
      const sportMatch = selectedSport === 'all' || match.sportId === selectedSport;
      const dateMatch = selectedDate === 'all' || match.date === selectedDate;
      const statusMatch = selectedStatus === 'all' || match.status === selectedStatus;
      return sportMatch && dateMatch && statusMatch;
    });
  }, [allTeamMatches, selectedSport, selectedDate, selectedStatus]);

  // Filter individual events
  const filteredIndividualEvents = useMemo(() => {
    return allIndividualEvents.filter(event => {
      const sportMatch = selectedSport === 'all' || event.sportId === selectedSport;
      const dateMatch = selectedDate === 'all' || event.date === selectedDate;
      const statusMatch = selectedStatus === 'all' || event.status === selectedStatus;
      return sportMatch && dateMatch && statusMatch;
    });
  }, [allIndividualEvents, selectedSport, selectedDate, selectedStatus]);

  // Check if selected sport is team or individual type
  const selectedSportType = useMemo(() => {
    if (selectedSport === 'all') return 'all';
    const sport = sportsConfig.find(s => s.id === selectedSport);
    return sport ? sport.type : 'all';
  }, [selectedSport]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedSport('cricket');
    setSelectedDate('2026-01-30');
    setSelectedStatus('completed');
  };

  // Calculate stats
  const stats = useMemo(() => {
    const completedTeam = allTeamMatches.filter(m => m.status === 'completed').length;
    const upcomingTeam = allTeamMatches.filter(m => m.status === 'upcoming').length;
    const completedIndividual = allIndividualEvents.filter(e => e.status === 'completed').length;
    const upcomingIndividual = allIndividualEvents.filter(e => e.status === 'upcoming').length;

    return {
      totalMatches: allTeamMatches.length + allIndividualEvents.length,
      completed: completedTeam + completedIndividual,
      upcoming: upcomingTeam + upcomingIndividual,
      totalSports: sportsConfig.length
    };
  }, [allTeamMatches, allIndividualEvents]);

  const hasActiveFilters = selectedSport !== 'cricket' || selectedDate !== '2026-01-30' || selectedStatus !== 'completed';
  const showTeamResults = selectedSportType === 'all' || selectedSportType === 'team';
  const showIndividualResults = selectedSportType === 'all' || selectedSportType === 'individual';

  return (
    <div className="resultSection">
      {/* Header */}
      <div className="resultHeader">
        <h1 className="resultTitle">🏆 Sports Results</h1>
        <p className="resultSubtitle">
          View all match results and upcoming fixtures across all sports
        </p>
      </div>

      {/* Stats Cards */}
      <div className="resultStats">
        <div className="statCard">
          <div className="statValue">{stats.totalMatches}</div>
          <div className="statLabel">Total Events</div>
        </div>
        <div className="statCard">
          <div className="statValue">{stats.completed}</div>
          <div className="statLabel">Completed</div>
        </div>
        <div className="statCard">
          <div className="statValue">{stats.upcoming}</div>
          <div className="statLabel">Upcoming</div>
        </div>
        <div className="statCard">
          <div className="statValue">{stats.totalSports}</div>
          <div className="statLabel">Sports</div>
        </div>
      </div>

      {/* Sport Tabs */}
      <div className="sportsTabs">
        {sportsConfig.map(sport => (
          <button
            key={sport.id}
            className={`sportTab ${selectedSport === sport.id ? 'sportTabActive' : ''}`}
            onClick={() => setSelectedSport(sport.id)}
          >
            <span className="sportTabIcon">{sport.icon}</span>
            {sport.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="resultFilters">
        <div className="filterGroup">
          <label className="filterLabel">Filter by Date</label>
          <select
            className="filterSelect"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="all">All Dates</option>
            {eventDates.map(d => (
              <option key={d.date} value={d.date}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filterGroup">
          <label className="filterLabel">Filter by Status</label>
          <select
            className="filterSelect"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button className="resetFilterBtn" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Team Sports Results Table */}
      {showTeamResults && filteredTeamMatches.length > 0 && (
        <div className="resultTableWrap">
          <div className="resultTableContainer">
            <table className="resultTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Sport</th>
                  <th>Date</th>
                  <th>Team 1</th>
                  <th>VS</th>
                  <th>Team 2</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeamMatches.map((match, index) => (
                  <tr key={`${match.sportId}-${match.matchId}`} className={match.status === 'upcoming' ? 'upcomingRow' : ''}>
                    <td>
                      <span className="matchIdBadge">{index + 1}</span>
                    </td>
                    <td>
                      <span className="sportBadge">
                        <span className="sportBadgeIcon">{match.sportIcon}</span>
                        {match.sportName}
                      </span>
                    </td>
                    <td className="dateCell">{formatDate(match.date)}</td>
                    <td>
                      <div className="teamNameWrapper">
                        <span className={`teamName ${match.winner === match.team1.name ? 'winnerTeam' : ''}`}>
                          {match.team1.name}
                        </span>
                        {match.team1.captain !== 'TBD' && (
                          <div className="captainTooltip">
                            <span className="captainLabel">Captain</span>
                            <span className="captainName">{match.team1.captain}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="vsText">VS</span>
                    </td>
                    <td>
                      <div className="teamNameWrapper">
                        <span className={`teamName ${match.winner === match.team2.name ? 'winnerTeam' : ''}`}>
                          {match.team2.name}
                        </span>
                        {match.team2.captain !== 'TBD' && (
                          <div className="captainTooltip">
                            <span className="captainLabel">Captain</span>
                            <span className="captainName">{match.team2.captain}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="resultCell">
                        {match.status === 'completed' && match.winner ? (
                          <span className="winnerBadge">
                            <span className="trophyIcon">🏆</span>
                            {match.winner}
                          </span>
                        ) : (
                          <span className="toBePlayedBadge">
                            <span className="clockIcon">⏳</span>
                            To Be Played
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Individual Sports Results */}
      {showIndividualResults && filteredIndividualEvents.length > 0 && (
        <div style={{ marginTop: showTeamResults && filteredTeamMatches.length > 0 ? '32px' : '0' }}>
          {filteredIndividualEvents.map(event => (
            <div key={`${event.sportId}-${event.eventId}`} className="individualResultCard">
              <div className="individualResultHeader">
                <div className="individualEventName">
                  <span>{event.sportIcon}</span>
                  {event.sportName} - {event.event}
                </div>
                <div className="individualEventDate">
                  📅 {formatDate(event.date)}
                </div>
                <span className={`individualResultStatus ${event.status === 'completed' ? 'statusCompleted' : 'statusUpcoming'}`}>
                  {event.status === 'completed' ? '✅ Completed' : '⏳ Upcoming'}
                </span>
              </div>
              {event.status === 'upcoming' && (
                <div className="noResults" style={{ padding: '30px 20px' }}>
                  <div className="noResultsIcon">🎯</div>
                  <p className="noResultsText">Results will be updated after the event</p>
                </div>
              )}
              {event.status === 'completed' && event.results && event.results.length > 0 && (
                <div className="resultTableContainer">
                  <table className="resultTable">
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>College/Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.results.map((result, idx) => (
                        <tr key={idx}>
                          <td>{result.position}</td>
                          <td>{result.name}</td>
                          <td>{result.college}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {filteredTeamMatches.length === 0 && filteredIndividualEvents.length === 0 && (
        <div className="resultTableWrap">
          <div className="noResults">
            <div className="noResultsIcon">🔍</div>
            <p className="noResultsText">No results found</p>
            <p className="noResultsSubtext">Try adjusting your filters to see more results</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;