import StatsGrid      from '../dashboard-assist/StatsGrid'
import ChartsRow      from '../dashboard-assist/ChartsRow'
import RecentBookings from '../dashboard-assist/RecentBookings'

export default function Dashboard() {
  return (
    <div className='w-full h-screen'>
      <StatsGrid />
      <ChartsRow />
      <RecentBookings />
    </div>
  )
}