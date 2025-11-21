import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Signal {
  id: number;
  asset: string;
  direction: 'CALL' | 'PUT';
  confidence: number;
  timestamp: string;
  expiry: string;
  status: 'active' | 'expired' | 'won' | 'lost';
}

const mockChartData = [
  { time: '09:00', value: 1.0845 },
  { time: '09:15', value: 1.0852 },
  { time: '09:30', value: 1.0848 },
  { time: '09:45', value: 1.0856 },
  { time: '10:00', value: 1.0862 },
  { time: '10:15', value: 1.0859 },
  { time: '10:30', value: 1.0865 },
];

const mockSignals: Signal[] = [
  {
    id: 1,
    asset: 'EUR/USD',
    direction: 'CALL',
    confidence: 78,
    timestamp: '10:32',
    expiry: '10:37',
    status: 'active'
  },
  {
    id: 2,
    asset: 'BTC/USD',
    direction: 'PUT',
    confidence: 85,
    timestamp: '10:30',
    expiry: '10:35',
    status: 'active'
  },
  {
    id: 3,
    asset: 'GBP/USD',
    direction: 'CALL',
    confidence: 72,
    timestamp: '10:28',
    expiry: '10:33',
    status: 'active'
  },
  {
    id: 4,
    asset: 'GOLD',
    direction: 'PUT',
    confidence: 68,
    timestamp: '10:25',
    expiry: '10:30',
    status: 'expired'
  },
];

export default function Index() {
  const [signals, setSignals] = useState<Signal[]>(mockSignals);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pocket Option Анализ</h1>
            <p className="text-muted-foreground mt-1">Торговые сигналы в реальном времени</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Текущее время</div>
            <div className="text-2xl font-mono font-semibold text-foreground">
              {currentTime.toLocaleTimeString('ru-RU')}
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активные сигналы</CardTitle>
              <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {signals.filter(s => s.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Средний процент: {Math.round(signals.filter(s => s.status === 'active').reduce((acc, s) => acc + s.confidence, 0) / signals.filter(s => s.status === 'active').length)}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Точность за день</CardTitle>
              <Icon name="Target" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">82%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +5% по сравнению с вчера
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Анализы за час</CardTitle>
              <Icon name="Activity" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                Обработано активов
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="LineChart" className="h-5 w-5 text-primary" />
                График EUR/USD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                    domain={['dataMin - 0.001', 'dataMax + 0.001']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Signal" className="h-5 w-5 text-primary" />
                Торговые сигналы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                {signals.map((signal, index) => (
                  <div 
                    key={signal.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        signal.direction === 'CALL' 
                          ? 'bg-success/20' 
                          : 'bg-destructive/20'
                      }`}>
                        <Icon 
                          name={signal.direction === 'CALL' ? 'ArrowUp' : 'ArrowDown'} 
                          className={`h-4 w-4 ${
                            signal.direction === 'CALL' 
                              ? 'text-success' 
                              : 'text-destructive'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{signal.asset}</div>
                        <div className="text-xs text-muted-foreground">
                          {signal.timestamp} → {signal.expiry}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={signal.status === 'active' ? 'default' : 'secondary'}
                        className={`font-mono font-semibold ${
                          signal.status === 'active' ? 'animate-pulse-glow' : ''
                        }`}
                      >
                        {signal.confidence}%
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1 capitalize">
                        {signal.status === 'active' ? 'активен' : 'истёк'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Zap" className="h-5 w-5 text-primary" />
              Рекомендации по входу
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" className="h-5 w-5 text-success" />
                  <span className="font-semibold text-success">Высокий сигнал</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">≥ 75%</div>
                <p className="text-sm text-muted-foreground">
                  Рекомендуется вход с полной позицией
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Activity" className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Средний сигнал</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">60-74%</div>
                <p className="text-sm text-muted-foreground">
                  Рекомендуется осторожный вход
                </p>
              </div>

              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertCircle" className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-destructive">Низкий сигнал</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{'< 60%'}</div>
                <p className="text-sm text-muted-foreground">
                  Вход не рекомендуется
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
