import React, { useEffect, useState } from 'react'
import coinGecko from '../utils/CryptoAPI/coinGecko'

const CoinList = () => {
  const [coins, setCoins] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await coinGecko.get('coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: 'bitcoin,ethereum',
        }
      })

      console.log(response.data)

    }

    fetchData()
  }, [])
  return (
    <div></div>
  )
}

export default CoinList