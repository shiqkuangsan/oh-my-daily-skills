#!/usr/bin/env python3
"""获取多币种对 CNY 的汇率"""

import json
import sys
import urllib.request
from datetime import datetime


def get_rates(currencies=None):
    """
    获取指定币种对 CNY 的汇率

    Args:
        currencies: 币种列表，如 ["USD", "TRY"]，默认 ["USD", "TRY"]

    Returns:
        dict: 包含各币种汇率的字典
    """
    if currencies is None:
        currencies = ["USD", "TRY"]

    result = {
        "success": False,
        "rates": {},
        "source": "",
        "date": datetime.now().strftime("%Y-%m-%d")
    }

    # 数据源1: fawazahmed0 (免费)
    try:
        url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json"
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode())
            rates = data["cny"]

            for currency in currencies:
                key = currency.lower()
                if key in rates and rates[key] != 0:
                    # 转换为 X/CNY 汇率（1 X = ? CNY）
                    result["rates"][currency] = round(1 / rates[key], 4)

            result["success"] = True
            result["source"] = "fawazahmed0/currency-api"
            return result
    except Exception:
        pass

    # 数据源2: exchangerate-api (备用)
    try:
        url = "https://api.exchangerate-api.com/v4/latest/CNY"
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode())
            rates = data["rates"]

            for currency in currencies:
                if currency in rates and rates[currency] != 0:
                    result["rates"][currency] = round(1 / rates[currency], 4)

            result["success"] = True
            result["source"] = "exchangerate-api.com"
            return result
    except Exception:
        pass

    # 所有数据源都失败，返回默认汇率
    result["rates"] = {
        "USD": 6.957,
        "TRY": 0.160
    }
    result["source"] = "fallback"
    result["error"] = "无法获取实时汇率，使用默认值"
    return result


if __name__ == "__main__":
    # 支持命令行参数指定币种
    currencies = sys.argv[1:] if len(sys.argv) > 1 else ["USD", "TRY"]
    result = get_rates(currencies)
    print(json.dumps(result, ensure_ascii=False, indent=2))
