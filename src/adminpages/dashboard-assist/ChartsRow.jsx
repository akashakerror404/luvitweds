import RevenueChart from '../Ui/charts/RevenueChart'
import DonutChart   from '../Ui/charts/DonutChart'

export default function ChartsRow() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'16px', marginBottom:'24px' }}>
      <div className="panel">
        <div className="panel-title">Monthly Revenue</div>
        <RevenueChart />
      </div>
      <div className="panel">
        <div className="panel-title">Booking Status</div>
        <DonutChart />
      </div>
    </div>
  )
}