import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface PlantAnalysisData {
  culture: string;
  growthStage: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  calcium: string;
  magnesium: string;
  sulfur: string;
}

interface PlantAnalysisFormProps {
  data: PlantAnalysisData;
  onChange: (data: PlantAnalysisData) => void;
}

export function PlantAnalysisForm({ data, onChange }: PlantAnalysisFormProps) {
  const handleChange = (field: keyof PlantAnalysisData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise Foliar</CardTitle>
        <CardDescription>
          Insira os resultados da análise nutricional de plantas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plant-culture">Cultura</Label>
            <Select value={data.culture} onValueChange={(value) => handleChange('culture', value)}>
              <SelectTrigger id="plant-culture">
                <SelectValue placeholder="Selecione a cultura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milho">Milho</SelectItem>
                <SelectItem value="soja">Soja</SelectItem>
                <SelectItem value="cafe">Café</SelectItem>
                <SelectItem value="cana">Cana-de-açúcar</SelectItem>
                <SelectItem value="feijao">Feijão</SelectItem>
                <SelectItem value="algodao">Algodão</SelectItem>
                <SelectItem value="citros">Citros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="growthStage">Estádio Fenológico</Label>
            <Select value={data.growthStage} onValueChange={(value) => handleChange('growthStage', value)}>
              <SelectTrigger id="growthStage">
                <SelectValue placeholder="Selecione o estádio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetativo">Vegetativo</SelectItem>
                <SelectItem value="florescimento">Florescimento</SelectItem>
                <SelectItem value="frutificacao">Frutificação/Enchimento</SelectItem>
                <SelectItem value="maturacao">Maturação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant-nitrogen">Nitrogênio - N (g/kg)</Label>
            <Input
              id="plant-nitrogen"
              type="number"
              step="0.1"
              placeholder="Ex: 35"
              value={data.nitrogen}
              onChange={(e) => handleChange('nitrogen', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant-phosphorus">Fósforo - P (g/kg)</Label>
            <Input
              id="plant-phosphorus"
              type="number"
              step="0.1"
              placeholder="Ex: 3.5"
              value={data.phosphorus}
              onChange={(e) => handleChange('phosphorus', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant-potassium">Potássio - K (g/kg)</Label>
            <Input
              id="plant-potassium"
              type="number"
              step="0.1"
              placeholder="Ex: 25"
              value={data.potassium}
              onChange={(e) => handleChange('potassium', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant-calcium">Cálcio - Ca (g/kg)</Label>
            <Input
              id="plant-calcium"
              type="number"
              step="0.1"
              placeholder="Ex: 8"
              value={data.calcium}
              onChange={(e) => handleChange('calcium', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant-magnesium">Magnésio - Mg (g/kg)</Label>
            <Input
              id="plant-magnesium"
              type="number"
              step="0.1"
              placeholder="Ex: 3.5"
              value={data.magnesium}
              onChange={(e) => handleChange('magnesium', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant-sulfur">Enxofre - S (g/kg)</Label>
            <Input
              id="plant-sulfur"
              type="number"
              step="0.1"
              placeholder="Ex: 2.5"
              value={data.sulfur}
              onChange={(e) => handleChange('sulfur', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
