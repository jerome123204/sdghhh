const app = require("express")();
__path = process.cwd()
const fs = require("fs");
app.get("/", async(req, res) => {
   res.json({message: "Welcome to my API"})
})
app.get('/sim', async(req, res, error) => {
  try {
  let path = `./sim.json`;
let dataa = JSON.parse(fs.readFileSync(path));
              let tete = req.query.ask;
var dataaa = dataa[tete][Math.floor(Math.random() * dataa[tete].length)];
  res.json({
      respond: dataaa
    })
    } catch (err) {
          return res.json({
            respond: "I don't know what you're saying. Please teach me"
          })
  }
})

app.get('/teach', async(req, res) => {
  let ask = req.query.ask;
  let ans = req.query.ans;
  if (!ask || !ans) return res.json({err: "Missing ans or ask query!"});
  let path = `./sim.json`;
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
    let dataa = JSON.parse(fs.readFileSync(path));
    if (!dataa[ask]) 
  dataa[ask] = [];
  res.json({ask: ask,
           ans: ans})
  dataa[ask].push(ans)
  fs.writeFileSync(path, JSON.stringify(dataa, null, 4))
});

const port =  process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening on port "+ port)
})