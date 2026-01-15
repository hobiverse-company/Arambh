// Comprehensive Rules and Regulations for All Sports

export const sportRules = {
  // ATHLETICS
  athletics_100m: {
    name: "100 Meter Race",
    category: "Athletics",
    overview: "A sprint race covering 100 meters on a straight track, testing pure speed and explosive power.",
    eligibility: {
      age: "Open to all age categories (U-14, U-17, U-19, and Open)",
      gender: "Separate events for Men and Women",
      participants: "Individual participation only",
    },
    rules: [
      {
        title: "Start",
        points: [
          "Athletes must use starting blocks",
          "False start rule: First false start results in disqualification",
          "Athletes must respond to three commands: 'On your marks', 'Set', and the gun",
          "Reaction time under 0.100 seconds is considered a false start",
        ]
      },
      {
        title: "During Race",
        points: [
          "Athletes must stay in their assigned lanes throughout the race",
          "No physical contact or obstruction of other runners",
          "Athletes must run the entire distance; stopping is grounds for disqualification",
          "Wind assistance readings will be taken; +2.0 m/s is the legal limit",
        ]
      },
      {
        title: "Finish",
        points: [
          "Winner is determined by the first torso to cross the finish line",
          "Photo finish equipment will be used for close finishes",
          "Athletes must complete the race in their assigned lane",
        ]
      },
      {
        title: "Equipment",
        points: [
          "Athletes may wear running spikes (maximum 9mm spike length)",
          "Starting blocks are mandatory",
          "Timing will be done electronically",
        ]
      }
    ],
    penalties: [
      "False start: Immediate disqualification",
      "Lane violation: Disqualification",
      "Obstruction of another runner: Disqualification",
      "Improper conduct: Warning or disqualification",
    ],
    format: "Heats, Semi-finals, and Finals (based on number of participants)",
    registrationFee: 50,
  },

  athletics_longjump: {
    name: "Long Jump",
    category: "Athletics",
    overview: "Athletes sprint down a runway and jump as far as possible from a takeoff board into a sand pit.",
    eligibility: {
      age: "Open to all age categories",
      gender: "Separate events for Men and Women",
      participants: "Individual participation only",
    },
    rules: [
      {
        title: "Attempts",
        points: [
          "Each athlete gets 3 attempts in the preliminary round",
          "Top 8 athletes advance to finals (3 additional attempts)",
          "Best jump from all attempts counts as final result",
          "Athletes can decline attempts but it will be recorded as a pass",
        ]
      },
      {
        title: "Takeoff",
        points: [
          "Athletes must take off from behind the foul line (takeoff board)",
          "Any part of the foot crossing the foul line results in a foul",
          "Athlete must land in the sand pit",
          "Takeoff must be from one foot only",
        ]
      },
      {
        title: "Measurement",
        points: [
          "Distance measured from the edge of the takeoff board to the nearest mark in the sand",
          "Measurement taken perpendicular to the takeoff line",
          "Electronic or manual measurement will be used",
          "Jump is measured to the nearest centimeter",
        ]
      },
      {
        title: "Landing",
        points: [
          "Athletes must land in the sand pit",
          "Walking back through the landing area is not permitted",
          "Must exit from the front or sides of the pit",
        ]
      }
    ],
    penalties: [
      "Stepping over the takeoff line: Foul, no distance recorded",
      "Landing outside the sand pit: Foul",
      "Somersaulting: Foul",
      "Walking back through landing area: Foul",
    ],
    format: "Preliminary round (3 attempts) → Finals (Top 8, 3 more attempts)",
    registrationFee: 50,
  },

  // TEAM SPORTS
  tug_of_war: {
    name: "Tug of War",
    category: "Team Sports",
    overview: "Two teams pull on opposite ends of a rope, with the goal of pulling the rope a certain distance towards their side.",
    eligibility: {
      teamSize: "6 active pullers + 2 substitutes (8 total)",
      gender: "Mixed teams allowed",
      weight: "Combined team weight limit may apply",
    },
    rules: [
      {
        title: "Team Composition",
        points: [
          "6 pullers on the rope at any time",
          "2 substitutes allowed (can be changed between rounds)",
          "All team members must be registered before the event",
          "Combined team weight should not exceed prescribed limit",
        ]
      },
      {
        title: "Equipment and Setup",
        points: [
          "Rope length: Minimum 33.5 meters",
          "Center marker at the middle of the rope",
          "Two markers 4 meters from center on each side",
          "Shoes without metal studs; proper footwear required",
          "Gloves are optional but no metal parts allowed",
        ]
      },
      {
        title: "Pulling Rules",
        points: [
          "Teams must not sit, kneel, or lock the rope",
          "All pullers must be behind the end of the rope at start",
          "No sudden drops or releases that could cause injury",
          "No wrapping rope around the body",
          "Teams pull on the whistle signal",
        ]
      },
      {
        title: "Winning",
        points: [
          "Pull the marker 4 meters past the center line to win",
          "Best of 3 rounds (first team to win 2 rounds)",
          "Each round has a time limit of 5 minutes",
          "If no team wins within time limit, team with best pull wins",
        ]
      }
    ],
    penalties: [
      "Sitting or kneeling: Warning, then loss of round",
      "Locking the rope: Loss of round",
      "Dangerous behavior: Disqualification",
      "Unsportsmanlike conduct: Warning or disqualification",
    ],
    format: "Single elimination or round-robin (based on entries)",
    registrationFee: 500,
  },

  kho_kho: {
    name: "Kho-Kho",
    category: "Team Sports",
    overview: "A traditional Indian tag sport where teams alternate between chasing and defending, requiring speed, strategy, and teamwork.",
    eligibility: {
      teamSize: "12 players per team",
      gender: "Girls Only",
      participants: "Team registration required",
    },
    rules: [
      {
        title: "Team Structure",
        points: [
          "12 players per team (9 chasers + 3 defenders at a time)",
          "Teams alternate between chasing and defending",
          "Two innings per match, 9 minutes each",
          "7 minutes of chasing time per turn",
        ]
      },
      {
        title: "Chasing Phase",
        points: [
          "8 chasers sit in the center squares facing alternate directions",
          "1 active chaser pursues defenders",
          "Active chaser can give 'Kho' by tapping a sitting player and saying 'Kho'",
          "Sitting players must face the same direction throughout the turn",
          "Active chaser cannot cross the center lane unless pursuing a defender",
        ]
      },
      {
        title: "Defending Phase",
        points: [
          "3 defenders enter the field and try to avoid being touched",
          "Defenders can run anywhere in the playing area",
          "Once touched, defender must leave the field",
          "New defender enters when one is out",
          "Defenders can take breaks at designated safe zones (poles)",
        ]
      },
      {
        title: "Playing Area",
        points: [
          "Court dimensions: 27m × 16m (approximately)",
          "Central lane: 23.5m × 30cm with 8 cross lanes",
          "4 poles at corners for safe zones",
          "Free zone at each end of the court",
        ]
      }
    ],
    penalties: [
      "Late Kho (chaser doesn't move immediately): Point to defending team",
      "Wrong direction chase: Point to defending team",
      "Crossing center lane illegally: Point to defending team",
      "Defender leaving the court: Defender out",
    ],
    format: "League round followed by knockout (Semifinals & Finals)",
    registrationFee: 600,
  },

  volleyball: {
    name: "Volleyball",
    category: "Team Sports",
    overview: "Two teams of 6 players compete to ground the ball on the opponent's court, separated by a net.",
    eligibility: {
      teamSize: "6 players + 2 substitutes (8 total)",
      gender: "Separate Men's and Women's events",
      participants: "Team registration required",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Best of 3 sets (first to win 2 sets)",
          "Each set played to 25 points (must win by 2)",
          "Deciding set (if needed) played to 15 points",
          "Rally point system (point on every serve)",
        ]
      },
      {
        title: "Service",
        points: [
          "Server must be behind the back line",
          "Ball must be clearly tossed or released before hitting",
          "Service must cross the net without touching it",
          "Team rotates clockwise after winning serve back",
          "Service time limit: 8 seconds after whistle",
        ]
      },
      {
        title: "Playing the Ball",
        points: [
          "Maximum 3 hits per side (block doesn't count)",
          "Same player cannot hit the ball twice consecutively (except on block)",
          "Ball can touch any part of the body",
          "Ball must be hit cleanly, not caught or thrown",
          "Net touch by player during active play is a fault",
        ]
      },
      {
        title: "Rotation and Positioning",
        points: [
          "6 players on court: 3 front row, 3 back row",
          "Players must maintain rotational order",
          "Back row players cannot attack from front zone",
          "Teams rotate clockwise when winning serve from opponent",
        ]
      }
    ],
    penalties: [
      "Net touch: Point to opponent",
      "Foot fault (crossing centerline): Point to opponent",
      "Double hit: Point to opponent",
      "Four touches: Point to opponent",
      "Catch or lift: Point to opponent",
    ],
    format: "Pool stage followed by knockout rounds",
    registrationFee: 500,
  },

  football: {
    name: "Football",
    category: "Team Sports",
    overview: "Two teams of 11 players compete to score goals by getting the ball into the opponent's net, using any body part except hands and arms.",
    eligibility: {
      teamSize: "11 players + 4 substitutes (15 total)",
      gender: "Men's and Women's categories",
      participants: "Team registration required",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Two halves of 20 minutes each (may vary based on tournament format)",
          "5-minute half-time break",
          "In case of a draw: Extra time (2 × 5 minutes) or penalty shootout",
          "Rolling substitutions allowed (check tournament-specific rules)",
        ]
      },
      {
        title: "Gameplay",
        points: [
          "11 players per team on the field",
          "1 goalkeeper (can use hands inside penalty area)",
          "Offside rule applies (player ahead of ball and last defender)",
          "Throw-ins when ball crosses sideline",
          "Goal kicks and corner kicks as per standard rules",
        ]
      },
      {
        title: "Fouls and Misconduct",
        points: [
          "Direct free kick: Kicking, tripping, pushing, holding opponent",
          "Indirect free kick: Dangerous play, obstruction",
          "Penalty kick: Direct free kick foul inside penalty area",
          "Yellow card: Caution for unsportsmanlike behavior",
          "Red card: Sending off for serious foul play (player cannot be replaced)",
        ]
      },
      {
        title: "Goalkeeper Rules",
        points: [
          "Can use hands only inside penalty area",
          "Cannot pick up deliberate back pass from teammate",
          "6 seconds to release ball after gaining possession",
          "Can be substituted like any other player",
        ]
      }
    ],
    penalties: [
      "Handball: Free kick or penalty",
      "Dangerous play: Free kick",
      "Persistent infringement: Yellow card",
      "Serious foul play: Red card",
      "Violent conduct: Red card",
    ],
    format: "Group stage → Quarterfinals → Semifinals → Finals",
    registrationFee: 1000,
  },

  basketball: {
    name: "Basketball",
    category: "Team Sports",
    overview: "Two teams of 5 players score points by shooting a ball through the opponent's hoop, combining athleticism, strategy, and teamwork.",
    eligibility: {
      teamSize: "5 players + 2 substitutes (7 total)",
      gender: "Men's and Women's categories",
      participants: "Team registration required",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "4 quarters of 8 minutes each (or 2 halves of 16 minutes)",
          "2-minute break between quarters, 5-minute halftime",
          "Overtime: 5 minutes if scores are tied",
          "Shot clock: 24 seconds per possession",
        ]
      },
      {
        title: "Scoring",
        points: [
          "Field goal inside arc: 2 points",
          "Field goal beyond three-point arc: 3 points",
          "Free throw: 1 point each",
          "Team with most points wins",
        ]
      },
      {
        title: "Ball Movement",
        points: [
          "Dribbling: Bouncing ball with one hand while moving",
          "Cannot dribble with two hands or resume dribbling after stopping (double dribble)",
          "Traveling: Taking more than 2 steps without dribbling",
          "Ball must advance past half-court within 8 seconds",
          "3-second violation: Offensive player cannot stay in key for more than 3 seconds",
        ]
      },
      {
        title: "Fouls",
        points: [
          "Personal foul: Illegal physical contact",
          "5 personal fouls: Player disqualified from game",
          "Team fouls: After 5 team fouls per quarter, bonus free throws awarded",
          "Technical foul: Unsportsmanlike conduct (2 free throws + possession)",
          "Flagrant foul: Excessive or violent contact (2 free throws + possession)",
        ]
      }
    ],
    penalties: [
      "Personal foul: Free throws or possession",
      "Technical foul: 2 free throws + possession",
      "Disqualification: 5 personal fouls or 2 technical fouls",
      "Travelling/Double dribble: Turnover",
    ],
    format: "League round → Knockout (Semifinals & Finals)",
    registrationFee: 500,
  },

  // INDOOR SPORTS
  chess: {
    name: "Chess",
    category: "Indoor Sports",
    overview: "A strategic board game between two players, where the objective is to checkmate the opponent's king.",
    eligibility: {
      age: "Open to all",
      gender: "Open category",
      participants: "Individual participation",
    },
    rules: [
      {
        title: "Time Control",
        points: [
          "Rapid chess format: 15 minutes per player",
          "Time increment: +10 seconds per move (if applicable)",
          "Clock must be pressed after each move",
          "Time runs out: Loss for that player",
        ]
      },
      {
        title: "Gameplay",
        points: [
          "Standard FIDE chess rules apply",
          "Touch-move rule: If you touch a piece, you must move it",
          "Castling, en passant, and promotion rules as per standard chess",
          "Player with white pieces moves first",
        ]
      },
      {
        title: "Winning Conditions",
        points: [
          "Checkmate: Opponent's king is in check with no legal moves",
          "Resignation: Player voluntarily concedes",
          "Time out: Player runs out of time",
          "Draw: Stalemate, insufficient material, threefold repetition, or mutual agreement",
        ]
      },
      {
        title: "Conduct",
        points: [
          "No talking during the game except offering a draw",
          "No use of electronic devices or notes",
          "Players must not disturb opponents",
          "Disputes resolved by arbiter/referee",
        ]
      }
    ],
    penalties: [
      "Illegal move: Warning first, then loss of game on second offense",
      "Touch-move violation: Must make that move if legal",
      "Using external assistance: Disqualification",
      "Unsportsmanlike conduct: Warning or disqualification",
    ],
    format: "Swiss system or knockout (based on entries)",
    registrationFee: 50,
  },

  carrom_singles: {
    name: "Carrom Singles",
    category: "Indoor Sports",
    overview: "A strike and pocket board game where players aim to pocket all their pieces (coins) before the opponent.",
    eligibility: {
      age: "Open to all",
      gender: "Open category",
      participants: "Individual (1v1)",
    },
    rules: [
      {
        title: "Objective",
        points: [
          "Pocket all your 9 coins (either white or black) before opponent",
          "Pocket the red queen and cover it by pocketing one of your coins",
          "First player to reach 25 points (or other decided score) wins the match",
        ]
      },
      {
        title: "Gameplay",
        points: [
          "Players alternate turns (striker must be within baseline)",
          "Toss decides first break and choice of color",
          "Break: All coins arranged in center, striker hits from baseline",
          "Player continues turn if they pocket their own coin",
          "Turn ends if striker falls, opponent's coin is pocketed, or no coin is pocketed",
        ]
      },
      {
        title: "Queen Rules",
        points: [
          "Queen must be pocketed and covered (by pocketing your own coin immediately after)",
          "If queen is pocketed but not covered, it's returned to center",
          "Queen gives 3 bonus points when covered",
          "Queen can be pocketed anytime during the game",
        ]
      },
      {
        title: "Scoring",
        points: [
          "Pocketing all your coins + queen: 5 points",
          "Pocketing all your coins (no queen): 3 points",
          "Each remaining opponent coin after you finish: +1 point",
          "Match typically played to 25 points or best of 3 boards",
        ]
      }
    ],
    penalties: [
      "Striker falling in pocket: Lose turn + penalty (return your pocketed coin)",
      "Pocketing opponent's coin: Lose turn + bonus to opponent",
      "Violating baseline: Foul, lose turn",
      "Touching any coin before striker settles: Foul",
    ],
    format: "Knockout rounds (Round of 16 → Finals)",
    registrationFee: 50,
  },

  carrom_doubles: {
    name: "Carrom Doubles",
    category: "Indoor Sports",
    overview: "Team-based carrom where two players form a team and sit opposite each other, coordinating strategy to win.",
    eligibility: {
      age: "Open to all",
      gender: "Open category",
      participants: "2 players per team",
    },
    rules: [
      {
        title: "Team Setup",
        points: [
          "Partners sit opposite each other",
          "Opponents sit on the remaining two sides",
          "Both team members share the same color coins",
          "Players alternate turns with opponents (not with partner)",
        ]
      },
      {
        title: "Gameplay",
        points: [
          "Same basic rules as singles carrom",
          "Partners work together to pocket all their team's coins",
          "Communication between partners is allowed",
          "Turn alternates: Player A (Team 1) → Player B (Team 2) → Player C (Team 1) → Player D (Team 2)",
        ]
      },
      {
        title: "Scoring & Winning",
        points: [
          "Team scores points collectively",
          "Same scoring system as singles",
          "First team to 25 points wins (or best of 3 boards)",
          "Both partners share the victory",
        ]
      },
    ],
    penalties: [
      "Same penalty rules as singles apply",
      "Both partners are responsible for their team's conduct",
    ],
    format: "Knockout rounds",
    registrationFee: 100,
  },

  // BADMINTON
  badminton_singles: {
    name: "Badminton Singles",
    category: "Badminton",
    overview: "One-on-one badminton match where players aim to hit the shuttlecock over the net into the opponent's court.",
    eligibility: {
      age: "Open to all",
      gender: "Men's and Women's categories",
      participants: "Individual",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Best of 3 games (first to win 2 games)",
          "Each game played to 21 points",
          "Must win by 2 points (no cap at 29-all, next point wins)",
          "2-minute break between games, 1-minute break at 11 points in each game",
        ]
      },
      {
        title: "Service Rules",
        points: [
          "Server must hit below waist level",
          "Racket head must point downwards during service",
          "Service made from right court when score is even, left when odd",
          "Service must land diagonally in opponent's service court",
          "Server gets only one attempt per service",
        ]
      },
      {
        title: "Scoring",
        points: [
          "Rally point system (point on every rally)",
          "Winner of rally scores a point and serves next",
          "If receiver wins rally, they gain the serve",
          "Switch ends after each game, and at 11 points in deciding game",
        ]
      },
      {
        title: "Court Play",
        points: [
          "Singles court width: Inner sideline",
          "Full length of court used",
          "Shuttlecock must land within boundaries",
          "Net height: 5 feet at center",
        ]
      }
    ],
    penalties: [
      "Service fault: Point to opponent",
      "Shuttlecock lands out: Point to opponent",
      "Shuttlecock touches player or clothing: Point to opponent",
      "Double hit: Point to opponent",
    ],
    format: "Knockout rounds (Round of 32 → Finals)",
    registrationFee: 100,
  },

  badminton_doubles: {
    name: "Badminton Doubles",
    category: "Badminton",
    overview: "Team-based badminton where two players work together to outplay the opposing pair.",
    eligibility: {
      age: "Open to all",
      gender: "Men's and Women's categories",
      participants: "2 players per team",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Best of 3 games to 21 points each",
          "Same scoring system as singles",
          "Partners coordinate positioning and shots",
        ]
      },
      {
        title: "Service Rules",
        points: [
          "Service alternates between partners based on score",
          "When serving side's score is even: serve from right court",
          "When serving side's score is odd: serve from left court",
          "Receiver's court determined by their score",
          "Partners do not switch courts when their team scores",
        ]
      },
      {
        title: "Court Play",
        points: [
          "Doubles court: Full width (outer sidelines)",
          "Short service line applies",
          "Partners cover different zones",
          "Communication and coordination crucial",
        ]
      },
    ],
    penalties: [
      "Same fault rules as singles",
      "Both partners share responsibility for team conduct",
    ],
    format: "Knockout rounds",
    registrationFee: 150,
  },

  badminton_mixed: {
    name: "Badminton Mixed Doubles",
    category: "Badminton",
    overview: "Doubles badminton with one male and one female player per team, combining strategy and mixed-gender coordination.",
    eligibility: {
      age: "Open to all",
      gender: "1 Male + 1 Female per team (mandatory)",
      participants: "2 players per team",
    },
    rules: [
      {
        title: "Team Composition",
        points: [
          "Must have 1 male and 1 female player",
          "No substitution once match starts",
          "Both players must be registered",
        ]
      },
      {
        title: "Gameplay",
        points: [
          "Same rules as regular doubles",
          "Best of 3 games to 21 points",
          "Same service and court rules as doubles",
          "Partners coordinate positioning strategies",
        ]
      },
    ],
    penalties: [
      "Gender requirement violation: Disqualification",
      "Same fault rules as regular doubles",
    ],
    format: "Knockout rounds",
    registrationFee: 150,
  },

  // TABLE TENNIS
  tt_singles: {
    name: "Table Tennis Singles",
    category: "Table Tennis",
    overview: "Fast-paced racket sport where players hit a lightweight ball back and forth across a table divided by a net.",
    eligibility: {
      age: "Open to all",
      gender: "Men's and Women's categories",
      participants: "Individual",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Best of 5 games (first to win 3 games)",
          "Each game played to 11 points",
          "Must win by 2 points (deuce at 10-10, continues until 2-point lead)",
          "1-minute break between games",
        ]
      },
      {
        title: "Service Rules",
        points: [
          "Ball must be tossed at least 16cm vertically before serving",
          "Ball must bounce once on server's side, then opponent's side",
          "Service alternates every 2 points (at 10-10, every point)",
          "Service must be made behind the end line",
          "Ball must be visible to opponent during service",
        ]
      },
      {
        title: "Rally",
        points: [
          "Ball must bounce once on your side before hitting back",
          "Ball can only bounce once per side",
          "No volleying (hitting before ball bounces)",
          "Ball hitting the net and going over during rally is valid",
        ]
      },
      {
        title: "Scoring",
        points: [
          "Point scored when opponent fails to return ball legally",
          "Point also scored for opponent's service or return errors",
          "Rally point system (point on every serve)",
        ]
      }
    ],
    penalties: [
      "Service fault: Point to opponent",
      "Ball hits net and doesn't cross: Point to opponent",
      "Double hit: Point to opponent",
      "Touching table with free hand: Point to opponent",
    ],
    format: "Knockout rounds (Round of 32 → Finals)",
    registrationFee: 100,
  },

  tt_doubles: {
    name: "Table Tennis Doubles",
    category: "Table Tennis",
    overview: "Team-based table tennis where partners alternate hitting the ball in a fast-paced coordinated effort.",
    eligibility: {
      age: "Open to all",
      gender: "Men's and Women's categories",
      participants: "2 players per team",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Best of 5 games to 11 points each",
          "Same scoring system as singles",
          "Partners must alternate hitting the ball",
        ]
      },
      {
        title: "Alternating Hits",
        points: [
          "After service, partners must alternate hitting the ball",
          "A-B-A-B sequence must be maintained",
          "Failing to alternate results in point to opponent",
          "Both players must be ready and in position",
        ]
      },
      {
        title: "Service Rules",
        points: [
          "Service alternates between teams every 2 points",
          "Service also alternates between partners",
          "Ball must bounce on server's right half-court, then opponent's right half-court",
        ]
      },
    ],
    penalties: [
      "Out-of-turn hit: Point to opponent",
      "Service fault: Point to opponent",
      "Same general fault rules as singles",
    ],
    format: "Knockout rounds",
    registrationFee: 150,
  },

  tt_mixed: {
    name: "Table Tennis Mixed Doubles",
    category: "Table Tennis",
    overview: "Doubles table tennis with one male and one female player per team.",
    eligibility: {
      age: "Open to all",
      gender: "1 Male + 1 Female per team (mandatory)",
      participants: "2 players per team",
    },
    rules: [
      {
        title: "Team Composition",
        points: [
          "Must have 1 male and 1 female player",
          "Both players must alternate hits",
          "No substitution once match starts",
        ]
      },
      {
        title: "Gameplay",
        points: [
          "Same rules as regular doubles",
          "Best of 5 games to 11 points",
          "Partners must alternate hitting",
        ]
      },
    ],
    penalties: [
      "Gender requirement violation: Disqualification",
      "Same fault rules as regular doubles",
    ],
    format: "Knockout rounds",
    registrationFee: 150,
  },

  // ESPORTS
  bgmi: {
    name: "BGMI (Battlegrounds Mobile India)",
    category: "Esports",
    overview: "Battle royale mobile game where squads compete to be the last team standing on a shrinking battleground.",
    eligibility: {
      age: "Must be 18+ (as per BGMI terms)",
      gender: "Open category",
      participants: "Squad of 4 players (no solo/duo allowed)",
    },
    rules: [
      {
        title: "Team Format",
        points: [
          "Squad mode only (4 players per team)",
          "All players must use mobile devices (tablets not allowed)",
          "TPP (Third Person Perspective) mode",
          "No emulators allowed",
        ]
      },
      {
        title: "Tournament Structure",
        points: [
          "Multiple rounds/matches played on different maps",
          "Points awarded based on placement and kills",
          "Placement points: 1st place (10 pts), 2nd (6 pts), 3rd (5 pts), etc.",
          "Kill points: 1 point per kill",
          "Team with highest total points wins",
        ]
      },
      {
        title: "Match Rules",
        points: [
          "All standard BGMI rules apply",
          "No teaming with other squads",
          "No stream sniping or ghosting",
          "Custom room code will be provided",
          "Players must join lobby 10 minutes before match",
        ]
      },
      {
        title: "Equipment",
        points: [
          "Players must bring their own mobile devices",
          "Stable internet connection required",
          "Headphones/earphones recommended",
          "Devices must have latest BGMI version installed",
        ]
      }
    ],
    penalties: [
      "Teaming: Disqualification",
      "Using hacks/cheats: Permanent ban + disqualification",
      "Toxic behavior: Warning or disqualification",
      "Late arrival: Match starts without team",
    ],
    format: "Multiple rounds, cumulative scoring",
    registrationFee: 200,
  },

  free_fire: {
    name: "Free Fire",
    category: "Esports",
    overview: "Fast-paced battle royale mobile game where squads fight for survival on a remote island.",
    eligibility: {
      age: "Open to all",
      gender: "Open category",
      participants: "Squad of 4 players (no solo/duo allowed)",
    },
    rules: [
      {
        title: "Team Format",
        points: [
          "Squad mode only (4 players per team)",
          "All players must use mobile devices",
          "No emulators or external controllers allowed",
          "TPP (Third Person Perspective) mode",
        ]
      },
      {
        title: "Tournament Structure",
        points: [
          "Multiple rounds on different maps",
          "Points system: Placement + Kills",
          "Booyah (1st place): 12 points",
          "Top placements: Decreasing points (2nd: 8pts, 3rd: 6pts, etc.)",
          "Each kill: 1 point",
        ]
      },
      {
        title: "Match Rules",
        points: [
          "Standard Free Fire rules apply",
          "No collaboration with enemy squads",
          "Custom room will be created for tournament",
          "Room ID and password shared before match",
          "All players must join 10 minutes before start",
        ]
      },
      {
        title: "Character & Loadout",
        points: [
          "Players can use their own characters and skills",
          "No character restrictions (unless specified)",
          "In-game purchases and items allowed",
        ]
      }
    ],
    penalties: [
      "Hacking/cheating: Permanent ban + disqualification",
      "Teaming with opponents: Disqualification",
      "Abusive behavior: Warning or disqualification",
      "Not joining on time: Forfeit match",
    ],
    format: "Multiple rounds, cumulative points-based ranking",
    registrationFee: 200,
  },

  // CRICKET
  cricket: {
    name: "Cricket",
    category: "Team Sports",
    overview: "A bat-and-ball game played between two teams of eleven players on a field with a 22-yard pitch. Teams alternate batting and bowling to score runs and take wickets.",
    eligibility: {
      teamSize: "11 players + 4 substitutes (15 total)",
      gender: "Men's and Women's categories",
      participants: "Team registration required",
    },
    rules: [
      {
        title: "Match Format",
        points: [
          "Tournament format: T20 (20 overs per side) or shorter formats based on schedule",
          "Each over consists of 6 legal deliveries",
          "Team batting first sets a target; team batting second chases",
          "Powerplay overs: First 6 overs with fielding restrictions",
          "Maximum 2 fielders outside 30-yard circle during powerplay",
          "After powerplay, maximum 5 fielders outside the circle",
        ]
      },
      {
        title: "Batting Rules",
        points: [
          "Two batsmen on the field at all times",
          "Batsman is out if bowled, caught, LBW, stumped, run out, hit wicket, or handled ball",
          "Runs scored by running between wickets or hitting boundaries (4 runs for ground boundary, 6 for over boundary)",
          "Wide and no-ball result in 1 extra run plus a free hit (for no-ball)",
          "Batsman must keep some part of body/bat behind crease to avoid being run out",
          "Obstructing the field or handling the ball illegally results in dismissal",
        ]
      },
      {
        title: "Bowling Rules",
        points: [
          "Bowler must deliver with a straight arm (no throwing/chucking)",
          "Front foot must land behind the popping crease (no-ball if exceeded)",
          "Wide ball: Ball too wide for batsman to play a normal shot",
          "No-ball: Front foot overstep, bouncer above shoulder, or full toss above waist",
          "Maximum 1 bouncer per over in limited-overs format",
          "Each bowler can bowl maximum 4 overs (in T20) or as per format",
        ]
      },
      {
        title: "Fielding Rules",
        points: [
          "11 fielders including wicketkeeper and bowler",
          "Wicketkeeper must remain behind stumps until ball is bowled",
          "Fielders cannot obstruct batsmen while running",
          "Fair catch: Ball must be caught cleanly without touching boundary or ground",
          "Substitute fielders allowed but cannot bat, bowl, or keep wicket",
          "Fielding positions must comply with powerplay restrictions",
        ]
      },
      {
        title: "Dismissals (Ways to Get Out)",
        points: [
          "Bowled: Ball hits and dislodges the stumps/bails",
          "Caught: Fielder catches ball before it touches ground",
          "LBW (Leg Before Wicket): Ball hits pad in line with stumps when going on to hit wicket",
          "Stumped: Wicketkeeper dislodges bails while batsman is out of crease",
          "Run Out: Fielder breaks wicket while batsman is outside crease",
          "Hit Wicket: Batsman accidentally hits own stumps",
          "Handled Ball / Obstructing Field: Deliberate interference",
        ]
      },
      {
        title: "Winning Conditions",
        points: [
          "Team with most runs wins",
          "If scores are tied: Super Over (1 over per side) decides winner",
          "Super Over tie: Count of boundaries, then wickets, then coin toss",
          "Team bowling second wins by wickets remaining",
          "Team batting second wins by runs scored above target",
        ]
      }
    ],
    penalties: [
      "No-ball: 1 run + free hit to batting team",
      "Wide ball: 1 run + ball rebowled",
      "Slow over rate: Penalty runs or fielding restrictions",
      "Ball tampering: Disqualification and potential ban",
      "Appealing excessively: Warning from umpire",
      "Dissent with umpire decision: Warning or penalty runs",
      "Deliberate short run: Run not counted + warning",
      "Fake fielding: 5 penalty runs to batting team",
    ],
    format: "Group stage → Quarterfinals → Semifinals → Finals",
    registrationFee: 800,
  },
};

// Helper function to get rules by sport ID
export const getRulesBySportId = (sportId) => {
  return sportRules[sportId] || null;
};

export default sportRules;
