import { useEffect, useState } from "react"
import _ from "lodash"
import './App.scss'

function App() {
  const [data, setData] = useState([])

  const bringData = async () => {
    const response = await fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json")
    const dataToDisplay = await response.json()
    const neededFields = _.map(dataToDisplay, item => {
      return _.pick(item, ['featured_media', 'link', 'title', 'date'])
    })
    setData(neededFields)
  }

  const formatDate = dateString => {
    let date = new Date(dateString);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${day} ${month} ${year}`
  }

  useEffect(() => {
    if (_.isEmpty(data)) {
      bringData()
    }
  }, [data])

  return (
    <div className="app row--25-25-25-25">
      { _.map(data, card => (
        <div className="col">
          <div className="p-card">
            <div className="p-card__inner u-no-padding">
              <p>CLOUD AND SERVER</p>
            </div>
            <hr/>
            <img alt="" className="p-card__image" src={_.get(card, 'featured_media')}/>
            <div className="p-card__inner">
              <h3><a href={_.get(card, 'link')}>{_.get(card, ['title', 'rendered'])}</a></h3>
            </div>
            <div className="p-card__inner">
              {formatDate(_.get(card, 'date'))}
            </div>
            <hr className="u-no-margin--bottom"/>
            <div className="p-card__inner">Article</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App;
