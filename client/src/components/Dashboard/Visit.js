import React from 'react'
import styles from './Visit.less'
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Visit (props) {
  return (
    <div>
      <div className={styles.title}>VISITS TOTAL</div>
      <ResponsiveContainer minHeight={360}>
        <AreaChart data={props.data}>
          <XAxis dataKey='name' tickLine={false}/>
          <YAxis axisLine={false} tickLine={false}/>
          <CartesianGrid vertical={false} strokeDasharray='3 3'/>
          <Tooltip/>
          <Legend />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Visit
