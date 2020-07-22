const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const app = express()

app.set("view engine",'ejs')
app.set("views",'./views')
app.use('/static',express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(morgan('dev'))
let port = process.env.PORT || 8000

app.get('/',(req,res)=>{
  res.render("apk",{
      title : 'sdf'
  }
  )
})

app.use((req,res,next)=>{
   next(new createError(404,"Page not found,wrong url!"))
})

app.use((err,req,res,next)=>{
  const status = err.status || 500
  res.json({
      status : status,
      message : err.message
  })
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
