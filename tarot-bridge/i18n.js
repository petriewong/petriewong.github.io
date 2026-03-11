// i18n Definitions
const translations = {
    en: {
        app_title: "Tarot Bridge",
        app_subtitle: "Draw your cards, focus your question, and cross the bridge for insight.",
        your_question: "Your Question",
        question_placeholder: "E.g., What do I need to know about my new job opportunity?...",
        draw_btn: "Draw Cards", // Fallback
        draw_btn_1: "Draw 1 Card",
        draw_btn_3: "Draw 3 Cards",
        draw_btn_9: "Draw 9 Cards",
        draw_btn_10: "Draw 10 Cards",
        the_spread: "The Spread",
        llm_prompt_title: "Your LLM Prompt",
        llm_prompt_subtitle: "Copy and paste this into ChatGPT, Claude, or your preferred LLM.",
        copy_btn: "Copy Prompt",
        open_gemini_btn: "Open in Gemini App",
        copied: "Copied ✓",
        journal_title: "Your Journal",
        export_btn: "Export Backup",
        import_btn: "Import Backup",
        clear_btn: "Clear History",
        journal_warning: "History saved securely in your browser's cookies.",
        no_readings: "No past readings found.",
        footer_text: "Offline First. No Data Sent to Servers.",
        role_past: "Past",
        role_present: "Present",
        role_future: "Future",
        method_label: "Method:",
        method_3card: "3-Card Draw (Past/Present/Future)",
        method_1card: "Single Card (Card of the Day)",
        method_spiritual: "Spiritual Spread",
        method_celtic: "Celtic Cross",
        role_spiritual_1: "Personality/Nature", role_spiritual_2: "Physical", role_spiritual_3: "Mental",
        role_spiritual_4: "Soul", role_spiritual_5: "Emotions", role_spiritual_6: "Heredity",
        role_spiritual_7: "Wisdom", role_spiritual_8: "Past Life", role_spiritual_9: "Destiny",
        role_celtic_1: "Present", role_celtic_2: "Obstacles", role_celtic_3: "Conscious",
        role_celtic_4: "Subconscious", role_celtic_5: "Past", role_celtic_6: "Near Future",
        role_celtic_7: "Position", role_celtic_8: "Environment", role_celtic_9: "Expectations/Desires",
        role_celtic_10: "Outcome",
        upright_suffix: "(U)",
        reversed_suffix: "(R)",
        prompt_template: 'I asked Tarot: {question}. Using the {method} spread, I drew {cards}... Interpret this?',
        prompt_template_1card: 'I asked Tarot: {question}. Using the {method} method, I drew {cards}... Interpret this?',
        clear_confirm: "Are you sure you want to clear all history? This cannot be undone unless you exported a backup.",
        no_history_export: "No history to export.",
        import_success: "Successfully imported {count} new readings!",
        import_error: "Could not parse file. Ensure it is a valid backup JSON from this app.",
        alert_no_question: "Please ask a question first!",
        copy_fail: "Failed to copy to clipboard. Please select the text and copy manually.",
        
        // Suits
        suit_wands: "Wands",
        suit_cups: "Cups",
        suit_swords: "Swords",
        suit_pentacles: "Pentacles",

        // Ranks
        rank_ace: "Ace", rank_two: "Two", rank_three: "Three", rank_four: "Four",
        rank_five: "Five", rank_six: "Six", rank_seven: "Seven", rank_eight: "Eight",
        rank_nine: "Nine", rank_ten: "Ten", rank_page: "Page", rank_knight: "Knight",
        rank_queen: "Queen", rank_king: "King",

        // Major Arcana
        major_0: "The Fool", major_1: "The Magician", major_2: "The High Priestess",
        major_3: "The Empress", major_4: "The Emperor", major_5: "The Hierophant",
        major_6: "The Lovers", major_7: "The Chariot", major_8: "Strength",
        major_9: "The Hermit", major_10: "Wheel of Fortune", major_11: "Justice",
        major_12: "The Hanged Man", major_13: "Death", major_14: "Temperance",
        major_15: "The Devil", major_16: "The Tower", major_17: "The Star",
        major_18: "The Moon", major_19: "The Sun", major_20: "Judgement",
        major_21: "The World",
        
        // Minor Arcana pattern
        minor_format: "{rank} of {suit}"
    },
    'zh-TW': {
        app_title: "塔羅之橋",
        app_subtitle: "抽牌、專注於你的問題，然後跨越橋樑獲取洞察。",
        your_question: "你的問題",
        question_placeholder: "例如：我需要為新的工作機會做什麼準備？...",
        draw_btn: "抽取牌",
        draw_btn_1: "抽取 1 張牌",
        draw_btn_3: "抽取 3 張牌",
        draw_btn_9: "抽取 9 張牌",
        draw_btn_10: "抽取 10 張牌",
        the_spread: "牌陣",
        llm_prompt_title: "你的 AI 提示詞",
        llm_prompt_subtitle: "複製並貼上到 ChatGPT、Claude 或你喜歡的 AI。 ",
        copy_btn: "複製提示詞",
        open_gemini_btn: "在 Gemini App 中開啟",
        copied: "已複製 ✓",
        journal_title: "你的日記",
        export_btn: "匯出備份",
        import_btn: "匯入備份",
        clear_btn: "清除歷史",
        journal_warning: "歷史紀錄安全地儲存在你的瀏覽器 Cookie 中。",
        no_readings: "找不到過去的占卜紀錄。",
        footer_text: "離線優先。不會傳送任何資料到伺服器。",
        role_past: "過去",
        role_present: "現在",
        role_future: "未來",
        method_label: "占卜方法：",
        method_3card: "三張牌陣 (過去/現在/未來)",
        method_1card: "單張牌陣 (每日一抽/是非題)",
        method_spiritual: "靈性牌陣",
        method_celtic: "塞爾特十字牌陣",
        role_spiritual_1: "性格・性質", role_spiritual_2: "肉體", role_spiritual_3: "精神",
        role_spiritual_4: "魂", role_spiritual_5: "感情", role_spiritual_6: "遺傳",
        role_spiritual_7: "知惠", role_spiritual_8: "前世", role_spiritual_9: "運命",
        role_celtic_1: "現狀", role_celtic_2: "障礙", role_celtic_3: "顯在意識",
        role_celtic_4: "潛在意識", role_celtic_5: "過去", role_celtic_6: "近未來",
        role_celtic_7: "本人的立場", role_celtic_8: "周圍環境", role_celtic_9: "願望",
        role_celtic_10: "最終結果",
        upright_suffix: "(正)",
        reversed_suffix: "(逆)",
        prompt_template: '我問了塔羅牌：「{question}」。使用 {method}，我抽到了：{cards}... 請為我解牌？',
        prompt_template_1card: '我向塔羅牌提問：{question}。使用 {method}，我抽到了 {cards}。請幫我解讀？',
        clear_confirm: "確定要清除所有歷史紀錄嗎？除非你有匯出備份，否則無法復原。",
        no_history_export: "沒有歷史紀錄可匯出。",
        import_success: "成功匯入 {count} 筆新紀錄！",
        import_error: "無法解析檔案。請確定它是從本工具匯出的有效 JSON 備份檔。",
        alert_no_question: "請先輸入你的問題！",
        copy_fail: "複製到剪貼簿失敗。請手動選取文字並複製。",
        
        // Suits
        suit_wands: "權杖",
        suit_cups: "聖杯",
        suit_swords: "寶劍",
        suit_pentacles: "錢幣",

        // Ranks
        rank_ace: "一", rank_two: "二", rank_three: "三", rank_four: "四",
        rank_five: "五", rank_six: "六", rank_seven: "七", rank_eight: "八",
        rank_nine: "九", rank_ten: "十", rank_page: "侍者", rank_knight: "騎士",
        rank_queen: "王后", rank_king: "國王",

        // Major Arcana
        major_0: "愚者", major_1: "魔術師", major_2: "女祭司",
        major_3: "皇后", major_4: "皇帝", major_5: "教皇",
        major_6: "戀人", major_7: "戰車", major_8: "力量",
        major_9: "隱者", major_10: "命運之輪", major_11: "正義",
        major_12: "倒吊人", major_13: "死神", major_14: "節制",
        major_15: "惡魔", major_16: "高塔", major_17: "星星",
        major_18: "月亮", major_19: "太陽", major_20: "審判",
        major_21: "世界",
        
        // Minor Arcana pattern
        minor_format: "{suit}{rank}"
    },
    'zh-CN': {
        app_title: "塔罗之桥",
        app_subtitle: "抽牌、专注于你的问题，然后跨越桥梁获取洞察。",
        your_question: "你的问题",
        question_placeholder: "例如：我需要为新的工作机会做什么准备？...",
        draw_btn: "抽取牌",
        draw_btn_1: "抽取 1 张牌",
        draw_btn_3: "抽取 3 张牌",
        draw_btn_9: "抽取 9 张牌",
        draw_btn_10: "抽取 10 张牌",
        the_spread: "牌阵",
        llm_prompt_title: "你的 AI 提示词",
        llm_prompt_subtitle: "复制并粘贴到 ChatGPT、Claude 或你喜欢的 AI。",
        copy_btn: "复制提示词",
        open_gemini_btn: "在 Gemini App 中打开",
        copied: "已复制 ✓",
        journal_title: "你的日记",
        export_btn: "导出备份",
        import_btn: "导入备份",
        clear_btn: "清除历史",
        journal_warning: "历史记录安全地存储在你的浏览器 Cookie 中。",
        no_readings: "找不到过去的占卜记录。",
        footer_text: "离线优先。不会发送任何数据到服务器。",
        role_past: "过去",
        role_present: "现在",
        role_future: "未来",
        method_label: "占卜方法：",
        method_3card: "三张牌阵 (过去/现在/未来)",
        method_1card: "单张牌阵 (每日一抽/是非题)",
        method_spiritual: "灵性牌阵",
        method_celtic: "塞尔特十字牌阵",
        role_spiritual_1: "性格・性质", role_spiritual_2: "肉体", role_spiritual_3: "精神",
        role_spiritual_4: "魂", role_spiritual_5: "感情", role_spiritual_6: "遗传",
        role_spiritual_7: "智慧", role_spiritual_8: "前世", role_spiritual_9: "命运",
        role_celtic_1: "现状", role_celtic_2: "障碍", role_celtic_3: "显在意识",
        role_celtic_4: "潜在意识", role_celtic_5: "过去", role_celtic_6: "近未来",
        role_celtic_7: "本人的立场", role_celtic_8: "周围环境", role_celtic_9: "愿望",
        role_celtic_10: "最终结果",
        upright_suffix: "(正)",
        reversed_suffix: "(逆)",
        prompt_template: '我问了塔罗牌：“{question}”。使用 {method}，我抽到了：{cards}... 请为我解牌？',
        prompt_template_1card: '我向塔罗牌提问：{question}。使用 {method}，我抽到了 {cards}。请帮我解读？',
        clear_confirm: "确定要清除所有历史记录吗？除非你有导出备份，否则无法恢复。",
        no_history_export: "没有历史记录可导出。",
        import_success: "成功导入 {count} 笔新记录！",
        import_error: "无法解析文件。请确保它是从本工具导出的有效 JSON 备份文件。",
        alert_no_question: "请先输入你的问题！",
        copy_fail: "复制到剪贴板失败。请手动选择文本并复制。",
        
        // Suits
        suit_wands: "权杖",
        suit_cups: "圣杯",
        suit_swords: "宝剑",
        suit_pentacles: "星币",

        // Ranks
        rank_ace: "一", rank_two: "二", rank_three: "三", rank_four: "四",
        rank_five: "五", rank_six: "六", rank_seven: "七", rank_eight: "八",
        rank_nine: "九", rank_ten: "十", rank_page: "侍从", rank_knight: "骑士",
        rank_queen: "王后", rank_king: "国王",

        // Major Arcana
        major_0: "愚者", major_1: "魔术师", major_2: "女祭司",
        major_3: "皇后", major_4: "皇帝", major_5: "教皇",
        major_6: "恋人", major_7: "战车", major_8: "力量",
        major_9: "隐士", major_10: "命运之轮", major_11: "正义",
        major_12: "倒吊人", major_13: "死神", major_14: "节制",
        major_15: "恶魔", major_16: "高塔", major_17: "星星",
        major_18: "月亮", major_19: "太阳", major_20: "审判",
        major_21: "世界",
        
        // Minor Arcana pattern
        minor_format: "{suit}{rank}"
    },
    ja: {
        app_title: "タロットブリッジ",
        app_subtitle: "カードを引き、質問に集中し、洞察への橋を渡ってください。",
        your_question: "あなたの質問",
        question_placeholder: "例：新しい仕事の機会について知っておくべきことは何ですか？...",
        draw_btn: "カードを引く",
        draw_btn_1: "1枚引く",
        draw_btn_3: "3枚引く",
        draw_btn_9: "9枚引く",
        draw_btn_10: "10枚引く",
        the_spread: "スプレッド",
        llm_prompt_title: "あなたのAIプロンプト",
        llm_prompt_subtitle: "これをChatGPT、Claudeなどにコピーして貼り付けてください。",
        copy_btn: "プロンプトをコピー",
        open_gemini_btn: "Gemini アプリで開く",
        copied: "コピーしました ✓",
        journal_title: "あなたのジャーナル",
        export_btn: "バックアップをエクスポート",
        import_btn: "バックアップをインポート",
        clear_btn: "履歴をクリア",
        journal_warning: "履歴はブラウザのCookieに安全に保存されます。",
        no_readings: "過去のリーディングが見つかりません。",
        footer_text: "オフラインファースト。サーバーにデータは送信されません。",
        role_past: "過去",
        role_present: "現在",
        role_future: "未来",
        method_label: "スプレッド：",
        method_3card: "3カード (過去/現在/未来)",
        method_1card: "1枚引き (今日のカード)",
        method_spiritual: "スピリチュアル・スプレッド",
        method_celtic: "ケルト十字スプレッド",
        role_spiritual_1: "性格・性質", role_spiritual_2: "肉体", role_spiritual_3: "精神",
        role_spiritual_4: "魂", role_spiritual_5: "感情", role_spiritual_6: "遺伝",
        role_spiritual_7: "知恵", role_spiritual_8: "前世", role_spiritual_9: "運命",
        role_celtic_1: "現状", role_celtic_2: "障害", role_celtic_3: "顕在意識",
        role_celtic_4: "潜在意識", role_celtic_5: "過去", role_celtic_6: "近い未来",
        role_celtic_7: "本人の立場", role_celtic_8: "周囲の環境", role_celtic_9: "願望",
        role_celtic_10: "最終結果",
        upright_suffix: "(正)",
        reversed_suffix: "(逆)",
        prompt_template: '私はタロットに尋ねました：「{question}」。{method}を使用して引いたカード：{cards}... これを解釈してください。',
        prompt_template_1card: 'タロットに質問しました：{question}。{method}を使用して引いたカードは {cards} です... これを解釈してもらえますか？',
        clear_confirm: "すべての履歴をクリアしてもよろしいですか？バックアップをエクスポートしていない限り、これは元に戻せません。",
        no_history_export: "エクスポートする履歴がありません。",
        import_success: "{count}件の新しいリーディングを正常にインポートしました！",
        import_error: "ファイルを解析できませんでした。このアプリからの有効なバックアップJSONであることを確認してください。",
        alert_no_question: "最初に質問を入力してください！",
        copy_fail: "クリップボードへのコピーに失敗しました。テキストを選択して手動でコピーしてください。",
        
        // Suits
        suit_wands: "ワンド",
        suit_cups: "カップ",
        suit_swords: "ソード",
        suit_pentacles: "ペンタクル",

        // Ranks
        rank_ace: "の1", rank_two: "の2", rank_three: "の3", rank_four: "の4",
        rank_five: "の5", rank_six: "の6", rank_seven: "の7", rank_eight: "の8",
        rank_nine: "の9", rank_ten: "の10", rank_page: "のペイジ", rank_knight: "のナイト",
        rank_queen: "のクイーン", rank_king: "のキング",

        // Major Arcana
        major_0: "愚者", major_1: "魔術師", major_2: "女教皇",
        major_3: "女帝", major_4: "皇帝", major_5: "教皇",
        major_6: "恋人", major_7: "戦車", major_8: "力",
        major_9: "隠者", major_10: "運命の輪", major_11: "正義",
        major_12: "吊るされた男", major_13: "死神", major_14: "節制",
        major_15: "悪魔", major_16: "塔", major_17: "星",
        major_18: "月", major_19: "太陽", major_20: "審判",
        major_21: "世界",
        
        // Minor Arcana pattern
        minor_format: "{suit}{rank}"
    },
    ko: {
        app_title: "타로 브리지",
        app_subtitle: "카드를 뽑고, 질문에 집중하고, 통찰력을 얻기 위해 다리를 건너세요.",
        your_question: "당신의 질문",
        question_placeholder: "예: 새로운 직무 기회에 대해 알아야 할 사항은 무엇입니까?...",
        draw_btn: "카드 뽑기",
        draw_btn_1: "1장 뽑기",
        draw_btn_3: "3장 뽑기",
        draw_btn_9: "9장 뽑기",
        draw_btn_10: "10장 뽑기",
        the_spread: "스프레드",
        llm_prompt_title: "당신의 AI 프롬프트",
        llm_prompt_subtitle: "ChatGPT, Claude 또는 선호하는 AI에 복사하여 붙여넣으세요.",
        copy_btn: "프롬프트 복사",
        open_gemini_btn: "Gemini 앱에서 열기",
        copied: "복사됨 ✓",
        journal_title: "당신의 일지",
        export_btn: "백업 내보내기",
        import_btn: "백업 가져오기",
        clear_btn: "기록 지우기",
        journal_warning: "기록은 브라우저 쿠키에 안전하게 저장됩니다.",
        no_readings: "과거 기록을 찾을 수 없습니다.",
        footer_text: "오프라인 퍼스트. 서버로 데이터가 전송되지 않습니다.",
        role_past: "과거",
        role_present: "현재",
        role_future: "미래",
        method_label: "스프레드:",
        method_3card: "3카드 (과거/현재/미래)",
        method_1card: "원 카드 (오늘의 카드)",
        method_spiritual: "영적 스프레드",
        method_celtic: "켈틱 크로스 스프레드",
        role_spiritual_1: "성격/본질", role_spiritual_2: "육체", role_spiritual_3: "정신",
        role_spiritual_4: "영혼", role_spiritual_5: "감정", role_spiritual_6: "유전",
        role_spiritual_7: "지혜", role_spiritual_8: "전생", role_spiritual_9: "운명",
        role_celtic_1: "현재", role_celtic_2: "장애물", role_celtic_3: "현재의식",
        role_celtic_4: "잠재의식", role_celtic_5: "과거", role_celtic_6: "가까운 미래",
        role_celtic_7: "나의 태도/입장", role_celtic_8: "주변 환경", role_celtic_9: "바람직/두려움",
        role_celtic_10: "최종 결과",
        upright_suffix: "(정)",
        reversed_suffix: "(역)",
        prompt_template: '타로에게 물었습니다: "{question}". {method}를 사용하여 뽑은 카드: {cards}... 이것을 해석해 주시겠습니까?',
        prompt_template_1card: '타로에게 물었습니다: {question}. {method}를 사용하여 뽑은 카드는 {cards} 입니다... 해석해 주시겠어요?',
        clear_confirm: "모든 기록을 지우시겠습니까? 백업을 내보내지 않은 이상 복구할 수 없습니다。",
        no_history_export: "내보낼 기록이 없습니다.",
        import_success: "{count}개의 새 기록을 성공적으로 가져왔습니다!",
        import_error: "파일을 분석할 수 없습니다. 이 앱의 유효한 백업 JSON인지 확인하세요.",
        alert_no_question: "먼저 질문을 입력하세요!",
        copy_fail: "클립보드에 복사하지 못했습니다. 텍스트를 선택하고 수동으로 복사하세요.",
        
        // Suits
        suit_wands: "지팡이",
        suit_cups: "컵",
        suit_swords: "검",
        suit_pentacles: "펜타클",

        // Ranks
        rank_ace: "의 에이스", rank_two: "의 2", rank_three: "의 3", rank_four: "의 4",
        rank_five: "의 5", rank_six: "의 6", rank_seven: "의 7", rank_eight: "의 8",
        rank_nine: "의 9", rank_ten: "의 10", rank_page: "의 시종", rank_knight: "의 기사",
        rank_queen: "의 여왕", rank_king: "의 왕",

        // Major Arcana
        major_0: "바보", major_1: "마법사", major_2: "고위 여사제",
        major_3: "여황제", major_4: "황제", major_5: "교황",
        major_6: "연인", major_7: "전차", major_8: "힘",
        major_9: "은둔자", major_10: "운명의 수레바퀴", major_11: "정의",
        major_12: "매달린 사람", major_13: "죽음", major_14: "절제",
        major_15: "악마", major_16: "탑", major_17: "별",
        major_18: "달", major_19: "태양", major_20: "심판",
        major_21: "세계",
        
        // Minor Arcana pattern
        minor_format: "{suit}{rank}"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Save to cookie (Expires in 1 year)
        document.cookie = `tarotBridgeLang=${lang}; max-age=31536000; path=/`;
        
        // Update DOM elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key === 'draw_btn') return; // Handled dynamically
            if (translations[lang][key]) {
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    if (el.placeholder) el.placeholder = translations[lang][key];
                    if (el.value && el.type === 'button') el.value = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        // Update specific text contents that are not purely static
        if (typeof updateDynamicLanguage === 'function') {
             updateDynamicLanguage();
        }
        if (typeof updateDrawButtonText === 'function') {
             updateDrawButtonText();
        }
    }
}

function getSavedLanguage() {
    const match = document.cookie.match(new RegExp('(^| )tarotBridgeLang=([^;]+)'));
    if (match) return match[2];
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) return 'zh-TW';
    if (browserLang.startsWith('zh')) return 'zh-CN';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    
    return 'en';
}

// Global translator helper
function t(key) {
    return translations[currentLang][key] || key;
}

// Template replacement
function t_replace(key, params = {}) {
    let str = t(key);
    for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, v);
    }
    return str;
}
