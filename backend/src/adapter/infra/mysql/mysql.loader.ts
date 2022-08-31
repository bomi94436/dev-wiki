import dataSource from './dataSource'

const mysqlLoader = async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log('typeorm app data source is ready')
    })
    .catch((error) => console.error(error))
}

export default mysqlLoader
