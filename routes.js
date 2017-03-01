const { getTimeCardsByName, updateTimeCardStatus } = require('./apiController');

const createRoutes = router => {
  router.get('/ping', function (req, res) {
    res.json({ message: 'PONG!' });
  });

  router.route('/timecards')
    .get(async(req, res) => {
      try {
        const timeCards = await getTimeCardsByName(req.query.name);
        res.json({ error: false, data: timeCards });
      } catch (error) {
        console.log(error);
        res.json({ error: true, message: "Error getting time cards", errorObject: error });
      }
    });

  router.route('/timecards/:id')
    .put(async(req, res) => {
      const { id }     = req.params;
      const { status } = req.body;
      try {
        const result = await updateTimeCardStatus(id, status);
        res.json({ error: false, result, id });
      } catch (error) {
        console.log(error);
        res.json({ error: true, message: "Error updating time card", errorObject: error });
      }
    });
};

module.exports = createRoutes;