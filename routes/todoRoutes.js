const express = require('express');
const router = express.Router();

const data = [
  {
    id: 1,
    title: 'nota1',
    description: 'A strange detail: taped to the aluminum hatch was an ordinary sheet of 8½ x 11 inch North American printer paper. On this had been printed a color image: a yellow ring encircling a blue disk lined with stars. Spread-eagled on its center, an eagle with a red-and-white-striped shield. The printer that had spat this thing out had been low on cyan ink and so the image was strangely banded and discolored. Exposure to space hadn’t done it any favors either.',
    status: 'To Do',
    tags: ['Seveneves', 'strange', 'red']
  },
  {
    id: 2,
    title: 'nota2',
    description: 'So their task now was to stabilize Ymir’s attitude by using her thrusters to push back against the unwanted rotation. And, as they had discovered the first time they’d tried it, her thrusters were small and weak compared to the momentum of the big ice shard. In aerospace lingo, they lacked control authority. Ymir was like a truck skidding on a patch of oil, responding only faintly to the steering wheel. That problem had been alleviated somewhat by the large expenditure of mass during the burn. Many tons of ice had been hurled out the nozzle in the form of steam. Ymir was lighter and more wieldy as a result. Calculating exactly how much more wieldy she was, and what it meant for the thrusters’ control authority, was, in itself, a significant task that consumed another half an hour just for a rough estimate.',
    status: 'To Do',
    tags: ['Seveneves', 'their', 'red']
  },
  {
    id: 3,
    title: 'nota3',
    description: 'Distracted by thinking about Rufus and his mine, Dinah became aware that the Space Troll’s transmission had changed. Instead of the familiar QRA QET, it now began with QSO, which in this context meant “can you communicate with… ?” This was followed by an unfamiliar call sign, which she didn’t recognize as such because it was so long: a string of digits and letters that didn’t follow any of the standard conventions for radio call signs.',
    status: 'To Do',
    tags: ['Seveneves', 'Distracted', 'blue']
  },
  {
    id: 4,
    title: 'nota4',
    description: 'Doob had brought with him a small can of compressed air—a common convenience used by electronics technicians to blow dust away from things they were working on. He aimed it “down” toward the aft end of the arklet and pressed the button. Air hissed out and he began drifting “up” toward the front door. He raised a hand above his head in time to kill his upward motion against the forward bulkhead, then turned to look into a different camera.',
    status: 'To Do',
    tags: ['Seveneves', 'brought', 'blue']
  },
  {
    id: 5,
    title: 'nota5',
    description: 'Further complications, as if any were wanted, came from the fact that the systems had to be fault tolerant. If one of them got bashed by a hurtling piece of moon shrapnel and began to leak, it needed to be isolated from the rest of the system before too much of the precious water, or ammonia, leaked into space. So, the system as a whole possessed vast hierarchies of check valves, crossover switches, and redundancies that had saturated even Ivy’s brain, normally an infinite sink for detail. She’d had to delegate all cooling-related matters to a working group that was about three-quarters Russian and one-quarter American. The majority of all space walk activity was related to the expansion and maintenance of the cooling system and, uncharacteristically for her, she was content just to get a report on it once a day.',
    status: 'In Progress',
    tags: ['Seveneves', 'complications', 'blue']
  },
  {
    id: 6,
    title: 'nota6',
    description: 'The backlash had started in a two-triad bolo where a number of like-minded Arkies, including Aïda, had “called bullshit” on the prevailing tone and substance of official statements emanating from the White Arklet and begun to denounce Tavistock Prowse as a puppet blogger for the regime. Dubbing themselves the “Black Bolo Brigade,” they had begun to spread their insurrectionist message to other arklets in the Swarm.',
    status: 'In Progress',
    tags: ['Seveneves', 'backlash', 'green']
  },
  {
    id: 7,
    title: 'nota7',
    description: 'Doob looked tired, and nodded off frequently, and hadn’t eaten a square meal since the last perigee, but he pulled himself together when he was needed and fed any new information into a statistical model, prepared long in advance, that would enable them to maximize their chances by ditching Amalthea and doing the big final burn at just the right times. But as he kept warning Ivy and Zeke, the time was coming soon when they would become so embroiled in the particulars of which rock was coming from which direction that it wouldn’t be a statistical exercise anymore. It would be a video game, and its objective would be to build up speed while merging into a stream of large and small rocks that would be overtaking them with the speed of artillery shells.',
    status: 'Done',
    tags: ['Seveneves', 'looked', 'green']
  },
  {
    id: 8,
    title: 'nota8',
    description: 'At the same time there had been 305 occupied, free-flying arklets plus 11 spares that were attached to Izzy but not occupied. The free-flying ones had housed 1,364 people; the remaining 188 humans had lived aboard Izzy as members of the General Population. But at any given time, 10 percent of the Arkies had been rotating through Izzy, bringing its population on a typical day up to 324. Prior to today’s disaster, 26 people had been killed in various mishaps, mostly smaller bolide strikes. Another 24 were now aboard the stolen MIV calling itself Red Hope, and if their claims were taken at face value, they would soon be en route to Mars.',
    status: 'Deleted',
    tags: ['Seveneves', 'same', 'green']
  },
  {
    id: 9,
    title: 'nota9',
    description: 'Her mild annoyance at his curiosity finally gave way. Maybe he could help. She turned her head toward the window and nodded at the familiar bulk of Amalthea, a few meters away. “That’s been my career, and my family’s career,” she said. “Working with minerals. Hard rock. Metallic ore. All of the robots are optimized for crawling around on a big piece of iron. They use magnets to stick to it. Their tools use plasma arcs or abrasive wheels to work it. Now, Sean’s basically telling me to shelve all of that. The future is ice, he says. That’s all he wants to hear about. All he wants me to work on.”',
    status: 'Deleted',
    tags: ['Seveneves', 'mild', 'green']
  }
];

router.route('/')
  .get(getAllTodos)
  .post(addTodo);

router.route('/:id')
  .get(getTodosById)
  .patch(updateTodo);

function getAllTodos (req, res) {
  res.status(200).json(data);
}

function getTodosById (req, res) {
  res.status(200).json(data.filter(todo => todo.id == req.params.id));
}

function addTodo (req, res) {
  const newTodoId = Math.max(...data.map(todo => todo.id)) + 1;
  const newTodo = {id: newTodoId, ...req.body};
  data.push(newTodo);

  res.status(201).json({ id: newTodoId });
}

function updateTodo (req, res) {
  data.find(todo => todo.id == req.params.id).status = req.body.status;
  res.status(200).json({update: 'Success'});
}

module.exports = router;
