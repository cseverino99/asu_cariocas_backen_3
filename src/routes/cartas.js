const Router = require('koa-router');

const router = new Router();

//por chatgpt
const suits = ['pica', 'corazon', 'diamante', 'trebol'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//solo un mazo
const deck = [];
//--------
for (const suit of suits) {
  for (const rank of ranks) {
    const card = {
      rank: rank,
      suit: suit
    };
    deck.push(card);
  }
}

const deckJSON = JSON.stringify(deck);


//----------

router.get("cartas.show", "/show", async (ctx) => {
    ctx.body = deckJSON
});

module.exports = router;