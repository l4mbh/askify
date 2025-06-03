import React from 'react';
import styled from 'styled-components';
import { acrylicBase, acrylicButton, themeAwareText, colors } from '../../styles/theme';
import { Card } from '../../components/ui';
import type { QuestionFiltersProps } from './types';

const FiltersCard = styled(Card)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FilterLabel = styled.label`
  ${themeAwareText}
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const Select = styled.select`
  ${acrylicBase}
  ${themeAwareText}
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  
  option {
    background: ${colors.light.background.primary};
    color: ${colors.light.text.primary};
  }
  
  .dark & option {
    background: ${colors.dark.background.primary};
    color: ${colors.dark.text.primary};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const TagButton = styled.button<{ $selected: boolean }>`
  ${acrylicButton}
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 20px;
  background: ${props => props.$selected 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : colors.light.background.secondary};
  color: ${props => props.$selected ? '#fff' : colors.light.text.primary};
  border: 1px solid ${props => props.$selected ? 'transparent' : colors.light.border.secondary};
  
  .dark & {
    background: ${props => props.$selected 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : colors.dark.background.secondary};
    color: ${props => props.$selected ? '#fff' : colors.dark.text.primary};
    border: 1px solid ${props => props.$selected ? 'transparent' : colors.dark.border.secondary};
  }
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  ${themeAwareText}
  font-size: 0.9rem;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #667eea;
`;

const ClearButton = styled.button`
  ${acrylicButton}
  padding: 8px 16px;
  font-size: 0.85rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  
  &:hover {
    background: linear-gradient(135deg, #ff5252 0%, #e74c3c 100%);
  }
`;

function QuestionFilters({ filters, onFiltersChange, subjects, availableTags }: QuestionFiltersProps) {
  const handleSortChange = (sortBy: 'newest' | 'votes' | 'answers' | 'views') => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleSubjectChange = (subject: string) => {
    onFiltersChange({ ...filters, subject });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleCheckboxChange = (field: 'showAnsweredOnly' | 'showHotOnly', value: boolean) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      sortBy: 'newest',
      subject: 'Tất cả',
      tags: [],
      showAnsweredOnly: false,
      showHotOnly: false
    });
  };

  return (
    <FiltersCard>
      <FilterSection>
        <FilterLabel>Sắp xếp theo</FilterLabel>
        <Select 
          value={filters.sortBy} 
          onChange={(e) => handleSortChange(e.target.value as 'newest' | 'votes' | 'answers' | 'views')}
        >
          <option value="newest">Mới nhất</option>
          <option value="votes">Nhiều vote nhất</option>
          <option value="answers">Nhiều trả lời nhất</option>
          <option value="views">Nhiều lượt xem nhất</option>
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Chủ đề</FilterLabel>
        <Select 
          value={filters.subject} 
          onChange={(e) => handleSubjectChange(e.target.value)}
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Tags ({filters.tags.length} đã chọn)</FilterLabel>
        <TagsContainer>
          {availableTags.map(tag => (
            <TagButton
              key={tag}
              $selected={filters.tags.includes(tag)}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </TagsContainer>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Bộ lọc khác</FilterLabel>
        <CheckboxContainer>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={filters.showAnsweredOnly}
              onChange={(e) => handleCheckboxChange('showAnsweredOnly', e.target.checked)}
            />
            Chỉ câu hỏi đã trả lời
          </CheckboxWrapper>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={filters.showHotOnly}
              onChange={(e) => handleCheckboxChange('showHotOnly', e.target.checked)}
            />
            Chỉ câu hỏi hot
          </CheckboxWrapper>
        </CheckboxContainer>
      </FilterSection>

      <ClearButton onClick={handleClearFilters}>
        Xóa tất cả bộ lọc
      </ClearButton>
    </FiltersCard>
  );
}

export default QuestionFilters; 