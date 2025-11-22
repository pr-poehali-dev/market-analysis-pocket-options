import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Asset {
  id: string;
  name: string;
  category: 'forex' | 'crypto' | 'stocks' | 'commodities';
}

interface Analysis {
  id: number;
  asset: string;
  callPercent: number;
  putPercent: number;
  recommendation: 'CALL' | 'PUT';
  timestamp: string;
  timeframe: number;
}

const assets: Asset[] = [
  { id: 'eur_usd', name: 'EUR/USD', category: 'forex' },
  { id: 'gbp_usd', name: 'GBP/USD', category: 'forex' },
  { id: 'usd_jpy', name: 'USD/JPY', category: 'forex' },
  { id: 'aud_usd', name: 'AUD/USD', category: 'forex' },
  { id: 'usd_cad', name: 'USD/CAD', category: 'forex' },
  { id: 'nzd_usd', name: 'NZD/USD', category: 'forex' },
  { id: 'usd_chf', name: 'USD/CHF', category: 'forex' },
  { id: 'eur_gbp', name: 'EUR/GBP', category: 'forex' },
  { id: 'eur_jpy', name: 'EUR/JPY', category: 'forex' },
  { id: 'eur_aud', name: 'EUR/AUD', category: 'forex' },
  { id: 'eur_cad', name: 'EUR/CAD', category: 'forex' },
  { id: 'eur_chf', name: 'EUR/CHF', category: 'forex' },
  { id: 'eur_nzd', name: 'EUR/NZD', category: 'forex' },
  { id: 'gbp_jpy', name: 'GBP/JPY', category: 'forex' },
  { id: 'gbp_aud', name: 'GBP/AUD', category: 'forex' },
  { id: 'gbp_cad', name: 'GBP/CAD', category: 'forex' },
  { id: 'gbp_chf', name: 'GBP/CHF', category: 'forex' },
  { id: 'gbp_nzd', name: 'GBP/NZD', category: 'forex' },
  { id: 'aud_jpy', name: 'AUD/JPY', category: 'forex' },
  { id: 'aud_cad', name: 'AUD/CAD', category: 'forex' },
  { id: 'aud_chf', name: 'AUD/CHF', category: 'forex' },
  { id: 'aud_nzd', name: 'AUD/NZD', category: 'forex' },
  { id: 'nzd_jpy', name: 'NZD/JPY', category: 'forex' },
  { id: 'nzd_cad', name: 'NZD/CAD', category: 'forex' },
  { id: 'nzd_chf', name: 'NZD/CHF', category: 'forex' },
  { id: 'cad_jpy', name: 'CAD/JPY', category: 'forex' },
  { id: 'cad_chf', name: 'CAD/CHF', category: 'forex' },
  { id: 'chf_jpy', name: 'CHF/JPY', category: 'forex' },
  { id: 'usd_sgd', name: 'USD/SGD', category: 'forex' },
  { id: 'usd_hkd', name: 'USD/HKD', category: 'forex' },
  { id: 'usd_sek', name: 'USD/SEK', category: 'forex' },
  { id: 'usd_nok', name: 'USD/NOK', category: 'forex' },
  { id: 'usd_dkk', name: 'USD/DKK', category: 'forex' },
  { id: 'usd_pln', name: 'USD/PLN', category: 'forex' },
  { id: 'usd_try', name: 'USD/TRY', category: 'forex' },
  { id: 'usd_zar', name: 'USD/ZAR', category: 'forex' },
  { id: 'usd_mxn', name: 'USD/MXN', category: 'forex' },
  { id: 'usd_rub', name: 'USD/RUB', category: 'forex' },
  { id: 'usd_inr', name: 'USD/INR', category: 'forex' },
  { id: 'usd_cny', name: 'USD/CNY', category: 'forex' },
  { id: 'usd_krw', name: 'USD/KRW', category: 'forex' },
  { id: 'usd_brl', name: 'USD/BRL', category: 'forex' },
  { id: 'eur_sek', name: 'EUR/SEK', category: 'forex' },
  { id: 'eur_nok', name: 'EUR/NOK', category: 'forex' },
  { id: 'eur_dkk', name: 'EUR/DKK', category: 'forex' },
  { id: 'eur_pln', name: 'EUR/PLN', category: 'forex' },
  { id: 'eur_try', name: 'EUR/TRY', category: 'forex' },
  { id: 'eur_zar', name: 'EUR/ZAR', category: 'forex' },
  { id: 'eur_rub', name: 'EUR/RUB', category: 'forex' },
  { id: 'gbp_sek', name: 'GBP/SEK', category: 'forex' },
  { id: 'gbp_nok', name: 'GBP/NOK', category: 'forex' },
  { id: 'gbp_dkk', name: 'GBP/DKK', category: 'forex' },
  { id: 'gbp_pln', name: 'GBP/PLN', category: 'forex' },
  { id: 'gbp_try', name: 'GBP/TRY', category: 'forex' },
  { id: 'gbp_zar', name: 'GBP/ZAR', category: 'forex' },
  { id: 'btc_usd', name: 'BTC/USD', category: 'crypto' },
  { id: 'eth_usd', name: 'ETH/USD', category: 'crypto' },
  { id: 'xrp_usd', name: 'XRP/USD', category: 'crypto' },
  { id: 'ltc_usd', name: 'LTC/USD', category: 'crypto' },
  { id: 'ada_usd', name: 'ADA/USD', category: 'crypto' },
  { id: 'bnb_usd', name: 'BNB/USD', category: 'crypto' },
  { id: 'sol_usd', name: 'SOL/USD', category: 'crypto' },
  { id: 'doge_usd', name: 'DOGE/USD', category: 'crypto' },
  { id: 'matic_usd', name: 'MATIC/USD', category: 'crypto' },
  { id: 'dot_usd', name: 'DOT/USD', category: 'crypto' },
  { id: 'aapl', name: 'Apple', category: 'stocks' },
  { id: 'tsla', name: 'Tesla', category: 'stocks' },
  { id: 'googl', name: 'Google', category: 'stocks' },
  { id: 'amzn', name: 'Amazon', category: 'stocks' },
  { id: 'msft', name: 'Microsoft', category: 'stocks' },
  { id: 'meta', name: 'Meta', category: 'stocks' },
  { id: 'nvda', name: 'NVIDIA', category: 'stocks' },
  { id: 'nflx', name: 'Netflix', category: 'stocks' },
  { id: 'gold', name: 'Золото', category: 'commodities' },
  { id: 'silver', name: 'Серебро', category: 'commodities' },
  { id: 'oil', name: 'Нефть', category: 'commodities' },
  { id: 'gas', name: 'Газ', category: 'commodities' },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('forex');
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(3);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);

  const filteredAssets = assets.filter(asset => asset.category === selectedCategory);

  const performAnalysis = () => {
    if (!selectedAsset || !selectedTimeframe) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const callPercent = Math.floor(Math.random() * 40) + 55;
      const putPercent = 100 - callPercent;
      const recommendation = callPercent > putPercent ? 'CALL' : 'PUT';

      const analysis: Analysis = {
        id: Date.now(),
        asset: assets.find(a => a.id === selectedAsset)?.name || '',
        callPercent,
        putPercent,
        recommendation,
        timeframe: selectedTimeframe,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };

      setCurrentAnalysis(analysis);
      setHistory(prev => [analysis, ...prev].slice(0, 5));
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Icon name="Bot" className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Бот-Анализатор</h1>
          <p className="text-muted-foreground">Pocket Option | Выбери актив для анализа</p>
        </header>

        <Card className="bg-card border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Target" className="h-5 w-5 text-primary" />
              Выбор актива
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Категория</label>
                <Select value={selectedCategory} onValueChange={(val) => {
                  setSelectedCategory(val);
                  setSelectedAsset('');
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forex">
                      <div className="flex items-center gap-2">
                        <Icon name="DollarSign" className="h-4 w-4" />
                        <span>Валюты</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="crypto">
                      <div className="flex items-center gap-2">
                        <Icon name="Bitcoin" className="h-4 w-4" />
                        <span>Криптовалюты</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="stocks">
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingUp" className="h-4 w-4" />
                        <span>Акции</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="commodities">
                      <div className="flex items-center gap-2">
                        <Icon name="Gem" className="h-4 w-4" />
                        <span>Сырьё</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Актив</label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите актив" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredAssets.map(asset => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Время сигнала</label>
                <Select value={selectedTimeframe.toString()} onValueChange={(val) => setSelectedTimeframe(parseInt(val))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 минута</SelectItem>
                    <SelectItem value="2">2 минуты</SelectItem>
                    <SelectItem value="3">3 минуты</SelectItem>
                    <SelectItem value="5">5 минут</SelectItem>
                    <SelectItem value="10">10 минут</SelectItem>
                    <SelectItem value="15">15 минут</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={performAnalysis} 
              disabled={!selectedAsset || !selectedTimeframe || isAnalyzing}
              className="w-full h-12 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                  Анализирую...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2 h-5 w-5" />
                  Запустить анализ
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {currentAnalysis && (
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Zap" className="h-5 w-5 text-primary animate-pulse-glow" />
                Результат анализа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Актив</div>
                  <div className="text-3xl font-bold text-foreground">{currentAnalysis.asset}</div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
                  <Icon name="Clock" className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Таймфрейм: {currentAnalysis.timeframe} мин</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className={`p-6 rounded-xl border-2 transition-all ${
                  currentAnalysis.recommendation === 'CALL' 
                    ? 'bg-success/20 border-success shadow-lg shadow-success/20' 
                    : 'bg-secondary/50 border-border'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowUp" className="h-6 w-6 text-success" />
                      <span className="font-semibold text-foreground">CALL (Вверх)</span>
                    </div>
                    {currentAnalysis.recommendation === 'CALL' && (
                      <Badge className="bg-success text-success-foreground">
                        Рекомендуется
                      </Badge>
                    )}
                  </div>
                  <div className="text-5xl font-mono font-bold text-foreground">
                    {currentAnalysis.callPercent}%
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Вероятность роста
                  </div>
                </div>

                <div className={`p-6 rounded-xl border-2 transition-all ${
                  currentAnalysis.recommendation === 'PUT' 
                    ? 'bg-destructive/20 border-destructive shadow-lg shadow-destructive/20' 
                    : 'bg-secondary/50 border-border'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon name="ArrowDown" className="h-6 w-6 text-destructive" />
                      <span className="font-semibold text-foreground">PUT (Вниз)</span>
                    </div>
                    {currentAnalysis.recommendation === 'PUT' && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        Рекомендуется
                      </Badge>
                    )}
                  </div>
                  <div className="text-5xl font-mono font-bold text-foreground">
                    {currentAnalysis.putPercent}%
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Вероятность падения
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 p-4 bg-primary/10 rounded-lg">
                <Icon name="Info" className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground">
                  Рекомендация: Открыть позицию <strong className={
                    currentAnalysis.recommendation === 'CALL' ? 'text-success' : 'text-destructive'
                  }>{currentAnalysis.recommendation}</strong> на {currentAnalysis.asset} на <strong>{currentAnalysis.timeframe} минут</strong>
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {history.length > 0 && (
          <Card className="bg-card border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" className="h-5 w-5 text-primary" />
                История анализов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        item.recommendation === 'CALL' 
                          ? 'bg-success/20' 
                          : 'bg-destructive/20'
                      }`}>
                        <Icon 
                          name={item.recommendation === 'CALL' ? 'ArrowUp' : 'ArrowDown'} 
                          className={`h-4 w-4 ${
                            item.recommendation === 'CALL' 
                              ? 'text-success' 
                              : 'text-destructive'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{item.asset}</div>
                        <div className="text-xs text-muted-foreground">{item.timestamp} • {item.timeframe} мин</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={item.recommendation === 'CALL' ? 'default' : 'destructive'}
                        className="font-mono font-semibold"
                      >
                        {item.recommendation === 'CALL' ? item.callPercent : item.putPercent}%
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}